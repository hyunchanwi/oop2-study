import { lectureSummaries } from './lecture-summaries.ts';
import type { LectureSummary } from './lecture-summaries.ts';
import { scopeOptions, studyNotes } from './claude-study-data.ts';
import { weeklyCatalog, weeklyLectureSummaries } from './weekly-catalog.ts';
import { gptLectureSummaries, gptScopeOptions, gptStudyNotes } from './gpt-study-data.ts';

export const allLectureSummaries = [...lectureSummaries, ...weeklyLectureSummaries, ...gptLectureSummaries];
export const allStudyNotes = [...studyNotes, ...gptStudyNotes];
export const studyScopeOptions = [...scopeOptions, ...gptScopeOptions].filter((scope, index, items) => items.findIndex((item) => item.id === scope.id) === index);

export function lectureSearchText(lecture: LectureSummary) {
  return [
    lecture.title, lecture.overview, lecture.location, lecture.recordingStatus, lecture.sourceStatus ?? '', ...lecture.sources,
    ...lecture.sections.flatMap((section) => [
      section.title, ...section.paragraphs, section.formula, section.example, section.code,
      ...(section.table?.headers ?? []), ...(section.table?.rows.flat() ?? []),
    ]),
  ].join(' ');
}

export function noteSearchText(note: (typeof allStudyNotes)[number]) {
  return [note.title, note.chapter, note.source, note.location, ...note.questionsAsked, ...note.explanation, note.question, note.answer].join(' ');
}

export function weeklyStudyIndex(weekNumber: number) {
  const week = weeklyCatalog.find((entry) => entry.number === weekNumber);
  if (!week) return [];
  return [
    { id: `week${weekNumber}-overview`, title: '자료와 주차 진도', keywords: [week.summary, week.evidence, ...week.materials].join(' ') },
    ...allLectureSummaries.filter((lecture) => week.lectureIds.includes(lecture.id)).map((lecture) => ({
      id: `learning-${lecture.id}`, title: lecture.title, keywords: lectureSearchText(lecture),
    })),
    ...allStudyNotes.filter((note) => note.scopes.some((scope) => week.noteScopes.includes(scope))).map((note) => ({
      id: `conversation-${note.id}`, title: note.title, keywords: noteSearchText(note),
    })),
  ];
}
