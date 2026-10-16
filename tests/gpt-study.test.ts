import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { gptLectureSummaries, gptStudyNotes } from '../src/gpt-study-data.ts';
import { allLectureSummaries, allStudyNotes, weeklyStudyIndex, studyScopeOptions } from '../src/study-data.ts';
import { lectureSummaries } from '../src/lecture-summaries.ts';
import { weeklyCatalog } from '../src/weekly-catalog.ts';
import { lessons, weeklySectionIndex } from '../content/lessons.ts';

void test('1·2주차를 보존하고 3~7주차 catalog·질문·목차 ID를 연결한다', () => {
  assert.deepEqual(lessons.map((lesson) => lesson.number), [1,2,3,4,5,6,7]);
  assert.deepEqual(weeklyCatalog[1].lectureIds, ['oop-time-interface','oop-lifetime','oop-lab']);
  assert.deepEqual(weeklyCatalog[1].noteScopes, ['week2','lab2']);
  assert.ok(lectureSummaries.every((lecture) => allLectureSummaries.includes(lecture)));
  assert.equal(new Set(allLectureSummaries.map((lecture) => lecture.id)).size, allLectureSummaries.length);
  assert.equal(new Set(allStudyNotes.map((note) => note.id)).size, allStudyNotes.length);
  for (const week of weeklyCatalog) {
    assert.ok(week.lectureIds.every((id) => allLectureSummaries.some((lecture) => lecture.id === id)));
    const index = weeklyStudyIndex(week.number);
    assert.equal(new Set(index.map((item) => item.id)).size, index.length);
    for (const id of week.lectureIds) assert.ok(index.some((item) => item.id === `learning-${id}`));
    for (const item of index.filter((item) => item.id.startsWith('conversation-'))) {
      const note = allStudyNotes.find((note) => `conversation-${note.id}` === item.id);
      assert.ok(note?.scopes.some((scope) => week.noteScopes.includes(scope)));
    }
  }
  assert.ok(!weeklyStudyIndex(6).some((item) => item.id.includes('week7')));
  assert.ok(!weeklyStudyIndex(7).some((item) => item.id.includes('week6')));
  assert.deepEqual(weeklyStudyIndex(99), []);
});

void test('상세 본문·수식·실제 코드·질문·접힌 해설까지 주차 검색에 포함한다', () => {
  const week5 = weeklySectionIndex(5).map((item) => item.keywords).join(' ');
  for (const term of ['[1,-1,-1]', 'coeff[i] *= rhs', 'rhs.coeff', '[-1,-5,-9]', '깊은 복사']) assert.ok(week5.includes(term), term);
  assert.ok(weeklySectionIndex(5).find((item) => item.id === 'learning-gpt-oop-week5-equation')?.keywords.includes('const Array& operator=(const Array& right)'));
  assert.ok(weeklySectionIndex(6).some((item) => item.keywords.includes('1000000')));
  assert.ok(weeklySectionIndex(7).some((item) => item.keywords.includes('std::make_unique')));
  for (const lecture of gptLectureSummaries) {
    assert.match(lecture.sourceStatus ?? '', /GPT.*편집/);
    assert.ok(lecture.scopes.every((scope) => studyScopeOptions.some((item) => item.id === scope)));
  }
  for (const note of gptStudyNotes) assert.ok(note.questionsAsked.length && note.question && note.answer && note.source.startsWith('GPT'));
  assert.doesNotMatch(JSON.stringify(gptLectureSummaries) + JSON.stringify(gptStudyNotes), /\/Users\/|sandbox:|chatgpt-content-reference|threadId|@/);
});

const compiler = process.env.CXX ?? 'c++';
const hasCompiler = spawnSync(compiler, ['--version']).status === 0;
void test('표시하는 완성 편집 C++ 예제의 실제 출력·객체 상태를 검증한다', { skip: !hasCompiler }, () => {
  const cases = [
    { id: 'gpt-oop-week3-exceptions', input: '0 2 1\n1 2 1\n', output: 'a must be nonzero\nD=0\n' },
    { id: 'gpt-oop-week4-increment', input: '', output: '5 7 7\n' },
    { id: 'gpt-oop-week5-equation', input: '', output: 'Equation checks passed\n' },
    { id: 'gpt-oop-week6-lab', input: 'A 0 1 3\nB 2 3 2\n', output: 'B(2,3) side=2 area=4\nA(0,1) side=3 area=9\n' },
    { id: 'gpt-oop-week7-polymorphism', section: '기초 포인터로 지울 때는 가상 소멸자가 필요하다', input: '', output: '20\nDerived destroyed\nBase destroyed\n' },
    { id: 'gpt-oop-week7-polymorphism', section: '같은 Base 참조에서 non-virtual과 virtual을 비교 실행한다', input: '', output: 'Base plain\nDerived virtual\nBase virtual\n' },
    { id: 'gpt-oop-week7-shape-input', input: 's 0 0 0 1\ny 0 0 0 1 3\nc 0 0 0 1 3\n', output: '4.19\n9.42\n3.14\n' },
  ];
  const tempParent = fileURLToPath(new URL('../.tmp/', import.meta.url));
  mkdirSync(tempParent, { recursive: true });
  const temp = mkdtempSync(join(tempParent, 'gpt-examples-'));
  try {
    for (const example of cases) {
      const code = gptLectureSummaries.find((lecture) => lecture.id === example.id)?.sections.find((section) => section.code.startsWith('#include') && (!example.section || section.title === example.section))?.code;
      assert.ok(code, example.id);
      const source = join(temp, `${example.id}.cpp`), binary = join(temp, example.id);
      writeFileSync(source, code);
      execFileSync(compiler, ['-std=c++17','-Wall','-Wextra',source,'-o',binary], { timeout: 30000 });
      assert.equal(execFileSync(binary, { input: example.input, encoding: 'utf8', timeout: 5000 }), example.output, example.id);
      if (example.id === 'gpt-oop-week7-shape-input') {
        assert.equal(execFileSync(binary, { input: 'z 0 0 0 1\ns 0 0 0 1\n', encoding: 'utf8', timeout: 5000 }), 'Unknown shape\n4.19\n');
        assert.equal(execFileSync(binary, { input: 's 0 0 0 1e200\ns 0 0 0 1\n', encoding: 'utf8', timeout: 5000 }), 'Invalid volume\n4.19\n');
        assert.equal(execFileSync(binary, { input: 's 0 0 0 text\n', encoding: 'utf8', timeout: 5000 }), '');
      }
    }
  } finally { rmSync(temp, { recursive: true, force: true }); }
});
