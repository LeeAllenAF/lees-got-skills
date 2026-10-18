const articleDateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
});

export function formatCount(
  count: number,
  singular: string,
  plural = `${singular}s`,
) {
  const label = count === 1 ? singular : plural;
  return `${count.toString().padStart(2, '0')} ${label}`;
}

export function formatArticleDate(date: string) {
  return articleDateFormatter.format(new Date(`${date}T12:00:00`));
}
