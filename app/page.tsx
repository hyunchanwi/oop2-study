'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Braces,
  Check,
  ChevronRight,
  CircleHelp,
  Clipboard,
  Code2,
  Cpu,
  FileCode2,
  GraduationCap,
  Lightbulb,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from 'lucide-react';
import { lessons, sectionIndex } from '../content/lessons';

const gradeBookCode = `class GradeBook {
public:
    GradeBook(string name);
    void setCourseName(string name);
    string getCourseName();
    void displayMessage();

private:
    string courseName;
};`;

const pointerCode = `int y{5};
int* yPtr{&y};   // y의 주소를 저장

*yPtr = 9;      // y가 저장된 곳에 9를 대입
cout << y;      // 9`;

export default function Home() {
  const [query, setQuery] = useState('');
  const [completed, setCompleted] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = window.localStorage.getItem('oop2-completed');
    return saved ? JSON.parse(saved) : [];
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [copied, setCopied] = useState('');

  const matches = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return sectionIndex;
    return sectionIndex.filter((section) => `${section.title} ${section.keywords}`.toLowerCase().includes(keyword));
  }, [query]);

  const progress = Math.round((completed.length / lessons.length) * 100);

  function toggleComplete() {
    const next = completed.includes(1) ? completed.filter((item) => item !== 1) : [...completed, 1];
    setCompleted(next);
    window.localStorage.setItem('oop2-completed', JSON.stringify(next));
  }

  function goToSection(id: string) {
    setMenuOpen(false);
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
  }

  function toggleAnswer(number: number) {
    setAnswers((current) => current.includes(number) ? current.filter((item) => item !== number) : [...current, number]);
  }

  async function copyCode(name: string, code: string) {
    await navigator.clipboard.writeText(code);
    setCopied(name);
    window.setTimeout(() => setCopied(''), 1400);
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top">
          <span className="brand-mark"><Braces size={20} /></span>
          <span><b>Object Note</b><small>객체지향프로그래밍 2 학습실</small></span>
        </a>
        <label className="search-box">
          <Search size={17} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="개념이나 코드 검색" aria-label="개념이나 코드 검색" />
          {query && <button onClick={() => setQuery('')} aria-label="검색어 지우기"><X size={16} /></button>}
        </label>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="목차 열기"><Menu size={21} /></button>
        <div className="header-progress" aria-label={`전체 진도 ${progress}%`}><span>{progress}%</span><div><i style={{ width: `${progress}%` }} /></div></div>
      </header>

      <div className="workspace" id="top">
        <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
          <div className="sidebar-heading"><span>강의 노트</span><small>{completed.length} / {lessons.length} 완료</small></div>
          <nav aria-label="강의 목차">
            {lessons.map((lesson) => (
              <button key={lesson.number} className={lesson.number === 1 ? 'active' : ''} onClick={() => lesson.number === 1 && goToSection('class')}>
                <span className={`lesson-number ${completed.includes(lesson.number) ? 'done' : ''}`}>{completed.includes(lesson.number) ? <Check size={13} /> : lesson.number}</span>
                <span><b>{lesson.title}</b><small>{lesson.topics[0]}</small></span>
                <ChevronRight size={15} />
              </button>
            ))}
          </nav>
          <div className="section-search">
            <span>{query ? `검색 결과 ${matches.length}개` : '1주차 개념'}</span>
            {matches.map((section) => <button key={section.id} onClick={() => goToSection(section.id)}>{section.title}<ArrowRight size={12} /></button>)}
            {matches.length === 0 && <p>일치하는 개념이 없어요.</p>}
          </div>
          <div className="sidebar-note"><Code2 size={18} /><b>채팅에서 배운 내용</b><p>예제와 오답을 주차별 노트에 계속 축적합니다.</p></div>
        </aside>

        <main className="content" id="lesson">
          <section className="lesson-hero">
            <div>
              <div className="eyebrow">WEEK 01 · 학습 가능</div>
              <h1>C++ 핵심 복습과<br />클래스 기초</h1>
              <p>{lessons[0].description}</p>
              <div className="topic-tags">{lessons[0].topics.map((topic) => <span key={topic}>{topic}</span>)}</div>
            </div>
            <button className={`complete-button ${completed.includes(1) ? 'completed' : ''}`} onClick={toggleComplete}>
              {completed.includes(1) ? <><Check size={18} /> 학습 완료</> : <><Target size={18} /> 완료로 표시</>}
            </button>
          </section>

          <div className="lesson-stack">
            <section className="note-card intro-card" id="class">
              <span className="section-kicker"><Sparkles size={16} /> 먼저 쉽게</span>
              <h2>클래스는 ‘새로운 자료형의 설계도’예요</h2>
              <p className="lead">정수는 <code>int</code>, 문자열은 <code>string</code>으로 다루듯이, 프로그래머가 필요한 데이터와 기능을 묶어 자신만의 자료형을 만들 수 있어요.</p>
              <div className="definition"><span>시험용 정의</span><p>클래스는 데이터 멤버와 멤버 함수를 하나의 사용자 정의 자료형으로 캡슐화한 것이다.</p></div>
              <div className="analogy-grid">
                <article><span>설계도</span><b>class GradeBook</b><p>어떤 정보와 기능을 가질지 정의</p></article>
                <ArrowRight />
                <article><span>실제 개체</span><b>GradeBook cpp;</b><p>설계도로 만든 독립적인 변수</p></article>
              </div>
            </section>

            <CodeCard name="GradeBook.h" code={gradeBookCode} copied={copied} onCopy={copyCode} />

            <section className="note-card" id="encapsulation">
              <span className="section-kicker"><ShieldCheck size={16} /> 정보 은닉</span>
              <h2>public은 공개 서비스, private은 보호할 상태</h2>
              <p className="subcopy">객체 밖에서는 <code>setCourseName()</code>과 같은 public 함수를 통해서만 데이터를 바꾸게 합니다. 잘못된 값을 검사하고 객체의 상태를 보호할 수 있어요.</p>
              <div className="comparison-grid">
                <article><span>public</span><h3>외부에 보여주는 조작판</h3><p>객체에 요청할 수 있는 멤버 함수를 둡니다.</p><code>book.displayMessage();</code></article>
                <article><span>private</span><h3>객체 안의 보호 공간</h3><p>해당 클래스의 멤버 함수만 접근할 수 있습니다.</p><code>string courseName;</code></article>
              </div>
              <div className="fact-row"><div><b>지역변수</b><span>함수가 끝나면 소멸</span></div><div><b>데이터 멤버</b><span>객체가 살아 있는 동안 유지</span></div><div><b>각 객체</b><span>자신만의 데이터 사본을 가짐</span></div></div>
            </section>

            <section className="note-card split-card" id="constructor">
              <div>
                <span className="section-kicker"><Cpu size={16} /> 객체의 첫 순간</span>
                <h2>생성자는 객체가 만들어질 때 자동 실행됩니다</h2>
                <ul className="concept-list"><li>클래스와 이름이 같습니다.</li><li>반환형을 적지 않으며 <code>void</code>도 금지입니다.</li><li>매개변수가 없는 것을 기본 생성자라고 합니다.</li></ul>
              </div>
              <div className="constructor-flow"><code>{'GradeBook book{"OOP"};'}</code><ArrowRight /><div><small>자동 호출</small><b>{'GradeBook("OOP")'}</b><span>courseName 초기화</span></div></div>
            </section>

            <section className="note-card" id="files">
              <span className="section-kicker"><FileCode2 size={16} /> 재사용 가능한 구조</span>
              <h2>인터페이스와 구현을 분리하면 사용하는 코드가 안정적이에요</h2>
              <div className="file-flow">
                <article><span>GradeBook.h</span><b>무엇을 할 수 있나?</b><p>public 함수 원형과 클래스 정의</p></article>
                <ArrowRight />
                <article><span>GradeBook.cpp</span><b>어떻게 실행하나?</b><p><code>GradeBook::</code>로 함수를 클래스에 연결</p></article>
                <ArrowRight />
                <article><span>main.cpp</span><b>클래스를 사용</b><p><code>{'#include "GradeBook.h"'}</code></p></article>
              </div>
              <div className="insight"><Lightbulb size={18} /><p><b>핵심:</b> 구현이 바뀌어도 public 인터페이스가 같으면 클라이언트 코드는 바꾸지 않아도 됩니다.</p></div>
            </section>

            <section className="note-card" id="functions">
              <span className="section-kicker"><Braces size={16} /> 실행 흐름</span>
              <h2>제어문은 흐름을 정하고, 함수는 작업을 나눕니다</h2>
              <div className="three-grid">
                <article><b>순차</b><span>위에서 아래로</span><code>a = 1; b = 2;</code></article>
                <article><b>선택</b><span>조건에 따라 분기</span><code>if · else · switch</code></article>
                <article><b>반복</b><span>조건 동안 반복</span><code>while · do · for</code></article>
              </div>
              <div className="parameter-note"><code>int add(int a, int b)</code><ArrowRight /><p>호출할 때 인수의 <b>개수·순서·자료형</b>이 매개변수와 맞아야 합니다. <code>void</code>는 값을 반환하지 않는다는 뜻입니다.</p></div>
            </section>

            <section className="note-card" id="containers">
              <span className="section-kicker"><BookOpen size={16} /> 여러 값을 한 번에</span>
              <h2>array는 크기가 고정되고, vector는 실행 중에 커질 수 있어요</h2>
              <div className="comparison-table">
                <div className="table-row table-head"><span>구분</span><b>array</b><b>vector</b></div>
                <div className="table-row"><span>크기</span><p>컴파일 때 고정</p><p>실행 중 변경 가능</p></div>
                <div className="table-row"><span>선언</span><p><code>array&lt;int, 5&gt; a;</code></p><p><code>vector&lt;int&gt; v(5);</code></p></div>
                <div className="table-row"><span>용도</span><p>크기가 변하지 않는 데이터</p><p>원소 개수가 달라지는 데이터</p></div>
              </div>
              <div className="warning-card"><CircleHelp size={19} /><div><b>괄호와 중괄호를 구분하세요</b><p><code>vector&lt;int&gt; a(7)</code>은 7개의 원소, <code>vector&lt;int&gt; b{"{7}"}</code>은 값 7을 가진 원소 1개입니다.</p></div></div>
              <div className="range-note"><code>for (int& item : items) item *= 2;</code><p><code>&</code>를 붙이면 복사본이 아니라 원본 원소를 수정합니다.</p></div>
            </section>

            <section className="note-card pointer-card" id="pointers">
              <span className="section-kicker"><Cpu size={16} /> 메모리를 가리키기</span>
              <h2>포인터는 값이 아니라 ‘값이 있는 주소’를 저장합니다</h2>
              <figure className="memory-flow" aria-label="yPtr이 y의 메모리 주소를 가리키는 그림">
                <div><small>포인터</small><b>yPtr</b><span>0x7ffe...</span></div><ArrowRight /><div className="memory-value"><small>실제 변수</small><b>y</b><span>9</span></div>
              </figure>
              <CodeCard name="pointer.cpp" code={pointerCode} copied={copied} onCopy={copyCode} compact />
              <div className="operator-grid"><article><b>&amp;y</b><span>y의 메모리 주소를 구함</span></article><article><b>*yPtr</b><span>그 주소에 저장된 값에 접근</span></article></div>
              <div className="insight"><Lightbulb size={18} /><p><b>정확한 표현:</b> 배열 이름 자체가 포인터인 것은 아니지만, 대부분의 식에서 첫 원소를 가리키는 포인터로 변환됩니다.</p></div>
            </section>

            <section className="note-card" id="const">
              <span className="section-kicker"><ShieldCheck size={16} /> 변경 권한 읽기</span>
              <h2>const가 무엇 옆에 붙었는지 보면 됩니다</h2>
              <div className="const-grid">
                <article><code>int* ptr</code><b>둘 다 변경 가능</b><p>주소도, 가리키는 값도 바꿀 수 있음</p></article>
                <article><code>const int* ptr</code><b>값이 const</b><p>다른 주소를 가리킬 수는 있음</p></article>
                <article><code>int* const ptr</code><b>포인터가 const</b><p>같은 주소만 가리키지만 값은 변경 가능</p></article>
                <article><code>const int* const ptr</code><b>둘 다 const</b><p>주소와 값 모두 변경 금지</p></article>
              </div>
            </section>

            <section className="quiz-card" id="check">
              <div className="quiz-heading"><span className="section-kicker"><GraduationCap size={16} /> 1분 확인 문제</span><h2>개념을 코드로 확인해보세요</h2></div>
              <Quiz number={1} question="생성자의 반환형은 void로 선언한다." answer="X" explanation="생성자는 값을 반환하지 않으며, void를 포함한 아무 반환형도 적지 않습니다." open={answers.includes(1)} onToggle={toggleAnswer} />
              <Quiz number={2} question="vector<int> numbers{7};는 int 원소 7개를 만든다." answer="X" explanation="중괄호는 초기화 목록으로 해석되어 값 7을 가진 원소 1개를 만듭니다. 7개를 만들려면 numbers(7)을 사용합니다." open={answers.includes(2)} onToggle={toggleAnswer} />
            </section>

            <section className="memory-strip">
              <div><span>01</span><p><b>클래스</b>는 설계도, 객체는 설계도로 만든 실체다.</p></div>
              <div><span>02</span><p><b>private</b>은 데이터를 보호하고 public 함수가 접근을 통제한다.</p></div>
              <div><span>03</span><p><b>포인터</b>는 메모리 주소를 저장하고 *로 값에 접근한다.</p></div>
            </section>
          </div>
        </main>

        <aside className="right-rail">
          <div className="rail-block"><span className="rail-label">이 페이지에서</span>{sectionIndex.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</div>
          <div className="memory-card"><Lightbulb size={18} /><b>오늘의 기억 문장</b><p>클래스는 설계도, 객체는 설계도로 만든 실체다.</p></div>
        </aside>
      </div>
    </div>
  );
}

function CodeCard({ name, code, copied, onCopy, compact = false }: { name: string; code: string; copied: string; onCopy: (name: string, code: string) => void; compact?: boolean }) {
  return <section className={`code-card ${compact ? 'compact' : ''}`}>
    <div className="code-copy"><span><i /> {name}</span><button onClick={() => onCopy(name, code)} aria-label={`${name} 코드 복사`}>{copied === name ? <Check size={14} /> : <Clipboard size={14} />}{copied === name ? '복사됨' : '코드 복사'}</button></div>
    <pre><code>{code}</code></pre>
    {!compact && <div className="code-explain"><span><b>public</b>은 객체 밖에서 사용할 서비스</span><span><b>private</b>은 객체가 스스로 보호하는 상태</span></div>}
  </section>;
}

function Quiz({ number, question, answer, explanation, open, onToggle }: { number: number; question: string; answer: string; explanation: string; open: boolean; onToggle: (number: number) => void }) {
  return <article className="quiz-item"><div><span>Q{number}</span><p>{question}</p></div><button onClick={() => onToggle(number)}>{open ? '해설 닫기' : '정답 확인'}<ChevronRight size={15} /></button>{open && <div className="answer"><b>정답 {answer}</b><p>{explanation}</p></div>}</article>;
}
