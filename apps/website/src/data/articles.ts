export type ArticleStatus = 'draft' | 'published';

export interface Article {
  readonly slug: string;
  readonly title: string;
  readonly date: string;
  readonly summary: string;
  readonly tags: readonly string[];
  readonly status: ArticleStatus;
  readonly paragraphs: readonly string[];
}

export const articles: readonly Article[] = [
  {
    slug: 'welcome-to-the-workshop',
    title: 'Welcome to the workshop',
    date: '2026-10-17',
    summary:
      'Why this little corner of the web values portable skills, deterministic tools, and checks that fit the change.',
    tags: ['agents', 'engineering', 'notes'],
    status: 'published',
    paragraphs: [
      'Lee\'s Got Skills is a workshop for small, portable skills that help coding agents work with more context and less guesswork.',
      'The aim is practical: deterministic scripts where they help, proportional validation, clear safety boundaries, and enough personality to make the work enjoyable.',
      'This blog will document experiments as they happen. Drafts stay drafts until they are ready; mistakes and tradeoffs are part of the record, not details to airbrush away.',
    ],
  },
  {
    slug: 'repository-bootstrap-notes',
    title: 'Repository bootstrap field notes',
    date: '2026-10-17',
    summary: 'Working notes for a future post about the first skill.',
    tags: ['agents', 'tooling'],
    status: 'draft',
    paragraphs: [],
  },
];
