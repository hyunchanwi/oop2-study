export const STUDY_NAVIGATION_EVENT = 'study-reveal-target';

export function hashTarget(hash: string) {
  if (!hash.startsWith('#') || hash.length < 2) return null;
  try { return decodeURIComponent(hash.slice(1)); } catch { return null; }
}

// Two frames let React commit a changed week or cleared detail filter first.
export function afterStudyRender(callback: () => void) {
  let frame = window.requestAnimationFrame(() => {
    frame = window.requestAnimationFrame(callback);
  });
  return () => window.cancelAnimationFrame(frame);
}

export function scrollToStudyTarget(id: string) {
  return afterStudyRender(() => {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start',
    });
  });
}

export function revealStudyTarget(id: string) {
  const request = new CustomEvent<string>(STUDY_NAVIGATION_EVENT, { detail: id, cancelable: true });
  window.dispatchEvent(request);
  // The detail component takes over when it must reveal a filtered card.
  if (!request.defaultPrevented) scrollToStudyTarget(id);
}
