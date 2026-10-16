export function weekFromSearch(search: string, weekNumbers: readonly number[]) {
  const value = new URLSearchParams(search).get('week');
  if (!value || !/^\d+$/.test(value)) return 1;
  const week = Number(value);
  return weekNumbers.includes(week) ? week : 1;
}

export function weekHref(href: string, week: number) {
  const url = new URL(href);
  url.searchParams.set('week', String(week));
  url.hash = '';
  return url.pathname + url.search;
}
