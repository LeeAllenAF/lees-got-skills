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
    slug: 'corpus-lab-small-model-sharp-edges',
    title: 'Corpus Lab: small model, sharp edges',
    date: '2026-10-18',
    summary:
      'What happened when deterministic retrieval, one small model, and a very opinionated validator met production.',
    tags: ['agents', 'retrieval', 'experiments', 'cloudflare'],
    status: 'published',
    paragraphs: [
      'Corpus Lab started with a simple question: could I put the agentic-development corpus behind a small model without turning the whole thing into a mystery box?',
      'The first part was intentionally boring. The corpus is compiled into a deterministic lexical index. Retrieval happens before inference. Exact document inspection does not call a model at all. When inference is useful, the model gets a bounded question, four retrieved passages, no tools, and no fallback model waiting behind the curtain.',
      'The production boundary is deliberately small too. Cloudflare Workers AI runs one Llama 3.2 3B model, while a SQLite-backed Durable Object handles the shared daily budget and visitor limits. The account is on the free plan with no payment method, and the application reserves less than the documented daily allocation. If a limit or dependency fails, the lab stops instead of improvising an expensive escape route.',
      'Then the small model fought the validator. I originally required every answer line to end with a perfectly formatted citation. The model produced useful answers with periods after citations, added line metadata inside the brackets, and occasionally left one line uncited. The server rejected all of them. Technically correct. Practically annoying. The validator now requires one allowed citation somewhere in the answer while still rejecting empty output, unknown sources, URLs, tool calls, and oversized responses.',
      'Passing validation did not mean the answer was good. I asked, “what is the easiest way to manage context?” The response wandered through evaluation methodology, trace analysis, repository sizing, and caching. Every paragraph had a source. None of it gave me the simple answer I asked for. It was a tidy, well-cited book report.',
      'That failure was more useful than another green test. Retrieval had interpreted “manage context” broadly, and the prompt encouraged the model to make use of whatever it received. The model did exactly that. A bounded evidence set reduces the room for invention, but it does not preserve the user’s intent by itself. The answer still has to answer the question, which sounds obvious until you build a machine that can successfully avoid doing exactly that.',
      'The system prompt now tells the model to answer the actual question directly, lead with the smallest useful action, choose one supported approach when asked for the easiest or best option, and ignore passages that are related but not useful. That should produce a better answer without pretending a three-billion-parameter model needs a courtroom-grade output contract.',
      'These are the next things I’ll try: add intent-aware query expansion for practical words like “easiest” and “manage,” build a small evaluation set from real questions instead of synthetic happy paths, expose enough retrieval reasoning to make bad matches obvious, and test whether a lightweight reranking step earns its cost. I also want to compare answer quality before and after each change so the lab does not quietly become more complicated without becoming more useful.',
      'For now, Corpus Lab is live. It is bounded, inspectable, cheap to run, and already wrong in ways that are teaching me something. That is a pretty good experiment.',
    ],
  },
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
