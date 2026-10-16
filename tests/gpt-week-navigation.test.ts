import assert from 'node:assert/strict';
import test from 'node:test';
import { weekFromSearch, weekHref } from '../src/week-navigation.ts';
import { STUDY_NAVIGATION_EVENT, hashTarget, revealStudyTarget, scrollToStudyTarget } from '../src/study-navigation.ts';

void test('주차 링크 직접 진입·새로고침·뒤앞 이동이 같은 쿼리 규칙을 따른다', () => {
  const weeks = [1,2,3,4,5,6,7];
  for (const week of weeks) {
    const href = weekHref('https://example.test/course/?source=hub#old-section', week);
    assert.equal(weekFromSearch(new URL(href, 'https://example.test').search, weeks), week);
    assert.equal(href, `/course/?source=hub&week=${week}`);
  }
  for (const search of ['', '?week=', '?week=-1', '?week=1.5', '?week=99', '?week=bad']) assert.equal(weekFromSearch(search, weeks), 1);
  assert.equal(weekFromSearch('?week=7', weeks), 7);
});

void test('해시를 안전하게 읽고 렌더 후 이동·필터 해제 위임·reduced motion을 지킨다', () => {
  assert.equal(hashTarget('#learning-gpt%2Doop-week7-shape-input'), 'learning-gpt-oop-week7-shape-input');
  assert.equal(hashTarget('#bad%'), null);
  assert.equal(hashTarget(''), null);
  const oldWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const oldDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');
  const frames = new Map<number, FrameRequestCallback>();
  const events = new EventTarget();
  const calls: { id: string; behavior: string }[] = [];
  let frame = 0, reducedMotion = false, visible = true;
  const id = 'learning-id[with-safe-punctuation]';
  const flushFrame = () => {
    const pending = [...frames.values()];
    frames.clear();
    for (const callback of pending) callback(0);
  };
  try {
    Object.defineProperty(globalThis, 'window', { configurable: true, value: {
      requestAnimationFrame: (callback: FrameRequestCallback) => { frames.set(++frame, callback); return frame; },
      cancelAnimationFrame: (key: number) => frames.delete(key),
      dispatchEvent: (event: Event) => events.dispatchEvent(event),
      matchMedia: () => ({ matches: reducedMotion }),
    } });
    Object.defineProperty(globalThis, 'document', { configurable: true, value: {
      getElementById: (target: string) => target === id && visible ? {
        scrollIntoView: (options: ScrollIntoViewOptions) => calls.push({ id: target, behavior: options.behavior ?? '' }),
      } : null,
    } });
    scrollToStudyTarget(id);
    assert.equal(calls.length, 0);
    flushFrame(); assert.equal(calls.length, 0);
    flushFrame(); assert.deepEqual(calls, [{ id, behavior: 'smooth' }]);

    const cancel = scrollToStudyTarget(id);
    cancel(); flushFrame(); flushFrame();
    assert.equal(calls.length, 1);

    visible = false; reducedMotion = true;
    events.addEventListener(STUDY_NAVIGATION_EVENT, (event) => {
      event.preventDefault();
      visible = true; // The detail component clears its filter before its post-render effect.
      scrollToStudyTarget((event as CustomEvent<string>).detail);
    });
    revealStudyTarget(id);
    flushFrame(); flushFrame();
    assert.deepEqual(calls, [{ id, behavior: 'smooth' }, { id, behavior: 'instant' }]);
    assert.equal(frames.size, 0); // No competing fallback scroll after owner handoff.
  } finally {
    if (oldWindow) Object.defineProperty(globalThis, 'window', oldWindow);
    else Reflect.deleteProperty(globalThis, 'window');
    if (oldDocument) Object.defineProperty(globalThis, 'document', oldDocument);
    else Reflect.deleteProperty(globalThis, 'document');
  }
});
