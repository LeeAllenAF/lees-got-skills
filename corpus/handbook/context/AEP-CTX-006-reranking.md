---
schema_version: '1.0'
id: AEP-CTX-006
title: Reranking
summary: 'Reranking. Focus: reranking, retrieval.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- context-engineering
tags:
- reranking
- retrieval
scope:
- enterprise-global
related:
- AEP-CTX-003
- AEP-CTX-004
- AEP-CTX-005
- AEP-QUESTIONS-001
- EXP-CTX-001
- EXP-CTX-017
- EXP-CTX-018
- EXP-CTX-019
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 120d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/context/AEP-CTX-006-reranking.md
  original_sha256: 5643b51cb6b6c920f533976d42a71e5ad84a7f66e97f8cba9c2c83249e3602c6
  original_metadata_record: handbook/context/AEP-CTX-006-reranking.md
  authority: inherited-source-context
---

# AEP-CTX-006 — Reranking

## 1. Purpose

This chapter defines the the platform working model for reranking in agent retrieval systems, with software repositories, engineering documentation, internal knowledge bases, and mixed code/document corpora as the primary workloads.

Reranking is a second-stage retrieval technique. A first-stage retriever efficiently generates a candidate set; a reranker then spends additional computation evaluating those candidates more deeply against the query and produces a better ordering or smaller final set.

The core design question is not:

> Is reranking good?

It is:

> For this workload, candidate set, context budget, latency target, and downstream agent, does the additional ranking computation improve end-to-end task success enough to justify its cost?

the platform therefore treats reranking as an optimization with measurable benefits and measurable costs—not as a mandatory component of every retrieval pipeline.

---

## 2. Working Definition

A reranker receives:

```text
query
+
retrieved candidate documents/chunks
```

and returns a new relevance ordering, typically with relevance scores.

A common two-stage architecture is:

```text
corpus
  ↓
fast first-stage retrieval
  ↓
Top N candidates
  ↓
reranker
  ↓
Top K results
  ↓
context construction
  ↓
agent
```

Typically:

```text
N > K
```

The first stage optimizes recall and speed.

The reranker optimizes precision among the retrieved candidates.

---

## 3. Why Reranking Still Matters

Modern embedding models and hybrid search are substantially better than earlier retrieval systems, but first-stage retrieval still has structural limitations.

Embedding retrieval generally computes document and query representations independently. That enables efficient indexing and nearest-neighbor search, but it limits direct query-document interaction during scoring.

Modern neural rerankers commonly evaluate the query and document jointly. This permits more detailed relevance reasoning at higher per-candidate computational cost.

That tradeoff remains useful:

```text
first-stage retrieval
  optimized for scale + recall

reranking
  optimized for precision
```

Current reranking products from providers such as Cohere and Voyage explicitly preserve this two-stage architecture rather than replacing it with a single universal retrieval step.

---

## 4. Current the platform Position

the platform currently recommends:

1. **Treat reranking as an optional second-stage precision mechanism, not a default requirement.**
2. **Use first-stage retrieval to maximize useful candidate recall at acceptable cost.**
3. **Use reranking when the first-stage candidate set contains valuable results but orders them poorly.**
4. **Evaluate reranking using downstream agent outcomes, not only ranking metrics.**
5. **Tune candidate depth (`N`) and final context depth (`K`) together.**
6. **Prefer specialized rerankers for routine relevance scoring unless an LLM reranker demonstrates enough additional value to justify its cost and latency.**
7. **Skip reranking when the retrieval problem is already deterministic or very high precision.**
8. **Consider conditional reranking rather than always-on reranking when query classes differ substantially.**

A likely initial the platform architecture is:

```text
query
  ↓
query classification / retrieval routing
  ↓
exact + lexical + semantic + structural retrieval
  ↓
candidate fusion
  ↓
should_rerank?
  ├── no  → context selection
  └── yes → specialized reranker
                ↓
            context selection
                ↓
               agent
```

This should remain provisional until evaluated against representative engineering workloads.

---

## 5. Reranking vs First-Stage Retrieval

These stages solve different problems.

### First-stage retrieval

The primary responsibility is:

> Do not miss potentially useful evidence.

Typical mechanisms include:

- exact lookup;
- BM25 / lexical retrieval;
- embeddings;
- hybrid retrieval;
- repository maps;
- graph/structural traversal;
- metadata filtering.

The candidate set should have strong recall.

### Reranking

The primary responsibility is:

> Given these plausible candidates, which are most useful for this specific query?

The reranker can spend more compute because it evaluates a much smaller set than the full corpus.

This distinction leads to an important architectural rule:

> A reranker cannot recover documents that first-stage retrieval never retrieved.

If relevant evidence is absent from the candidate set, improving the reranker does not solve the underlying recall problem.

---

## 6. Cross-Encoder Rerankers

A common reranker architecture is the cross-encoder.

Conceptually:

```text
embedding retrieval

encode(query)      → vector
encode(document)   → vector
similarity(query_vector, document_vector)
```

versus:

```text
cross-encoder reranking

encode(query + document together)
        ↓
relevance score
```

Joint query-document processing generally permits more nuanced relevance estimation because the model can directly attend across both inputs.

The cost is that this computation must be repeated for each candidate.

For `N` candidate documents, reranking cost therefore grows approximately with the amount of query-document material evaluated across those candidates.

This makes candidate depth a central engineering parameter.

---

## 7. Candidate Depth

Reranking creates two important parameters:

```text
N = candidates retrieved before reranking
K = results retained after reranking
```

Example:

```text
hybrid search → top 100
reranker      → top 12
agent context → 12 chunks
```

Increasing `N` may improve recall because the reranker has more opportunities to recover useful results that ranked poorly in the first stage.

But increasing `N` also increases:

- reranking tokens;
- compute;
- latency;
- API cost;
- exposure to low-quality candidates.

Increasing `K` may provide the agent with more evidence but also consumes active context and can introduce distracting information.

Therefore:

> `N` and `K` must be tuned against downstream task success rather than selected independently.

Anthropic's published Contextual Retrieval experiment is a useful example rather than a universal prescription: it retrieved 150 candidates, reranked them, and selected 20 for downstream use. Their tested corpus showed a large reduction in retrieval failure from adding reranking, while they explicitly cautioned that candidate depth must be tuned for latency and cost.

the platform should not inherit `150 → 20` as a default configuration; it should inherit the experimental method.

---

## 8. Specialized Rerankers

Specialized reranking models are attractive because relevance estimation is a bounded task.

Current systems demonstrate several useful properties:

- query-document joint scoring;
- relatively inexpensive inference compared with frontier reasoning models;
- multilingual support;
- structured or semi-structured document support;
- long per-document context in newer models;
- fast and quality-oriented model variants.

As of the baseline date, Cohere exposes separate `rerank-v4.0-pro` and `rerank-v4.0-fast` variants, while Voyage provides dedicated reranking models and documents reranking as a normal second stage after embeddings or lexical retrieval.

This reinforces an important the platform principle:

> A highly capable general model should not automatically replace a specialized model when the specialized model performs a bounded operation adequately.

---

## 9. LLM-Based Reranking

A general LLM can also rerank candidates.

Possible approaches include:

### Pointwise scoring

Evaluate each candidate independently:

```text
query + document → relevance score
```

### Pairwise ranking

Ask the model which of two candidates is more relevant.

### Listwise ranking

Present multiple candidates and ask the model to order them together.

### Reasoned selection

Ask the model to identify which candidates contain evidence required to solve the task and explain why.

LLM reranking may be useful when relevance requires complex reasoning that a specialized relevance model does not capture.

For example:

> Which of these architectural decision records is relevant to a migration that must preserve backward compatibility with both REST and GraphQL clients?

However, LLM reranking typically increases:

- latency;
- cost;
- nondeterminism;
- context usage;
- implementation complexity.

the platform should therefore require demonstrated downstream benefit before replacing a specialized reranker with a frontier LLM for ordinary relevance ranking.

---

## 10. Cascaded Reranking

A larger retrieval system may use multiple narrowing stages.

Example:

```text
1,000,000 indexed items
        ↓
lexical / ANN retrieval
        ↓
200 candidates
        ↓
fast reranker
        ↓
40 candidates
        ↓
higher-quality reranker
        ↓
10 candidates
        ↓
agent
```

This creates a cost-quality cascade analogous to model routing.

Cascades may be appropriate when:

- the corpus is very large;
- precision requirements are high;
- the first-stage candidate set must remain broad;
- a fast reranker can cheaply eliminate obvious noise;
- expensive ranking is reserved for a very small final candidate set.

They should not be added merely because the architecture appears sophisticated.

Each stage must justify itself empirically.

---

## 11. Conditional Reranking

Not all queries require reranking.

Consider:

```text
Find the definition of createPaymentIntent.
```

Exact/symbol retrieval may already produce an unambiguous result.

Compare:

```text
Which code and architecture documents explain how payment retry behavior is supposed to work?
```

This broader query is much more likely to benefit from candidate generation followed by reranking.

the platform should therefore evaluate conditional reranking based on signals such as:

- exact identifier detected;
- lexical result dominance;
- score separation;
- candidate ambiguity;
- query class;
- candidate-set size;
- requested context budget;
- downstream task risk.

Potential architecture:

```text
retrieve
  ↓
inspect candidate distribution
  ↓
┌─────────────────────────┐
│ high-confidence result? │
└───────────┬─────────────┘
            │
       yes  │  no
        ↓   │   ↓
       skip │ rerank
            │
            ↓
      context selection
```

This is a candidate cost optimization and should be experimentally validated.

---

## 12. Reranking Mixed Engineering Content

Engineering knowledge rarely consists of homogeneous prose.

Candidate documents may include:

- source code;
- API documentation;
- ADRs;
- READMEs;
- tickets;
- stack traces;
- config files;
- schemas;
- logs;
- CI output;
- test code;
- structured metadata.

A reranker must therefore be evaluated on the actual document types it will rank.

A model that performs well on prose QA datasets may not necessarily rank:

```text
symbol declaration
vs
call site
vs
unit test
vs
architecture document
```

correctly for a coding task.

This is another reason the platform should not select rerankers solely from general leaderboard performance.

---

## 13. Representation Before Reranking

Candidate representation matters.

A raw code chunk may be less understandable than a source-aware representation such as:

```text
repository: payments-api
path: src/services/payment-service.ts
symbol: PaymentService.createPayment
language: TypeScript
kind: method

<code>
```

Similarly, a documentation chunk may benefit from:

```text
document: Authentication Architecture
section: Token Refresh
status: approved
version: 3.1

<text>
```

Reranking should therefore be evaluated together with document representation.

The ranking model should receive enough provenance and structure to judge relevance without unnecessary token expansion.

---

## 14. Structured and Semi-Structured Reranking

Modern rerankers increasingly support JSON or semi-structured inputs.

This may be useful for engineering records where relevance depends on multiple fields:

```json
{
  "path": "apps/api/src/auth/refresh.ts",
  "symbol": "refreshToken",
  "language": "typescript",
  "content": "..."
}
```

or:

```json
{
  "id": "ADR-0042",
  "title": "Token Refresh Strategy",
  "status": "accepted",
  "service": "identity",
  "content": "..."
}
```

the platform should evaluate whether structured fields improve ranking compared with flattened text representations.

---

## 15. Reranking and Diversity

Pure relevance ranking may produce redundant results.

For example, the top ten candidates might all be nearly identical call sites while omitting:

- the function definition;
- its tests;
- the ADR explaining its intended behavior;
- configuration that changes its runtime behavior.

Therefore the final context selector may need to optimize both:

```text
relevance
+
coverage / diversity
```

Reranking and diversity selection should be considered separate stages.

Possible architecture:

```text
candidates
  ↓
relevance reranking
  ↓
deduplication / clustering
  ↓
diversity-aware selection
  ↓
context
```

A reranker should not be expected to solve every context-selection concern simultaneously.

---

## 16. Reranking and Context Budgets

Reranking becomes especially valuable when active context is scarce.

If a system can retrieve 100 plausible candidates but only afford 8 in active context, ranking quality strongly affects the information available to the agent.

As context budgets grow, reranking may still matter because irrelevant context has non-token costs:

- attention competition;
- contradictory evidence;
- stale information;
- duplicated content;
- increased generation latency;
- larger prompts;
- greater prompt-injection surface.

Therefore:

> Large context windows reduce some retrieval pressure but do not eliminate relevance engineering.

---

## 17. Failure Modes

### 17.1 Candidate recall failure

The relevant document never reaches the reranker.

**Remedy:** improve first-stage retrieval, routing, query expansion, metadata, or candidate depth.

### 17.2 Reranker semantic bias

A conceptually similar document outranks an exact implementation artifact required by the task.

**Remedy:** preserve exact-match/structural signals or introduce task-aware features.

### 17.3 Candidate over-expansion

Too many candidates increase latency and cost without improving final results.

**Remedy:** tune `N` empirically.

### 17.4 Context over-selection

A good reranker is used but too many final results are still placed into context.

**Remedy:** tune `K` and evaluate context-budget tradeoffs.

### 17.5 Long-document truncation

Relevant content may lie outside the portion evaluated by the reranker.

**Remedy:** chunk appropriately, preserve hierarchy, or use models/configurations with appropriate per-document limits.

### 17.6 Reranking already-obvious results

Exact or high-confidence retrieval is unnecessarily passed through a second model.

**Remedy:** conditional reranking or deterministic bypass.

### 17.7 LLM reranker overuse

A frontier model is used for routine relevance scoring where a specialized reranker provides equivalent results.

**Remedy:** benchmark specialized models first.

### 17.8 Ranking-metric tunnel vision

A reranker improves NDCG/MRR but downstream coding-agent outcomes do not improve.

**Remedy:** treat task success as the ultimate evaluation layer.

---

## 18. Evaluation Model

the platform should evaluate reranking at three levels.

### Layer 1 — Retrieval metrics

Examples:

- Recall@N;
- Precision@K;
- MRR;
- NDCG;
- MAP;
- hit rate.

These help diagnose ranking behavior.

### Layer 2 — Context metrics

Examples:

- relevant tokens / total retrieved tokens;
- duplicate-content rate;
- source diversity;
- authoritative-source coverage;
- context tokens saved;
- irrelevant-token rate.

### Layer 3 — Downstream agent metrics

Examples:

- task completion rate;
- test pass rate;
- correct file identification;
- patch correctness;
- tool calls;
- retries;
- human intervention;
- total model tokens;
- total cost;
- wall-clock latency.

the platform should not adopt a reranker solely because Layer 1 improves.

---

## 19. Economic Model

The complete cost of reranking is not simply the reranker API charge.

Approximate total value should consider:

```text
reranker cost
+
reranker latency
-
downstream context tokens saved
-
frontier-model compute avoided
-
retries avoided
-
failed tasks avoided
```

A reranker that costs a small amount but prevents a much larger model from processing thousands of irrelevant tokens may reduce total cost.

Conversely, reranking five already-obvious search results may be pure overhead.

This is why reranking economics must be measured end to end.

---

## 20. Security Considerations

Reranking does not establish trust.

A highly relevant malicious document remains malicious.

Therefore authorization and trust boundaries must occur independently from relevance scoring.

Conceptually:

```text
candidate retrieved
  ↓
authorized for this caller/task?
  ↓
trust/provenance preserved
  ↓
reranking
  ↓
context construction
```

or, where architecture requires ranking before filtering, authorization must still be enforced before content enters the model's active context.

The critical principle is:

> Relevance score must never be interpreted as authority score.

See AEP-CTX-002.

---

## 21. Initial the platform Decision Framework

### Skip reranking when

- exact lookup resolves the request;
- candidate count is already very small;
- first-stage precision is consistently excellent;
- the task is latency-critical and reranking shows little downstream benefit;
- deterministic metadata or structural lookup dominates semantic relevance.

### Strongly consider reranking when

- first-stage retrieval has good recall but weak ordering;
- hybrid retrieval produces many plausible candidates;
- context budget is constrained;
- documents are semantically similar;
- user wording differs significantly from corpus wording;
- high-value evidence appears below the first-stage cutoff;
- reducing irrelevant context substantially lowers downstream model cost.

### Consider higher-cost / LLM reranking when

- relevance requires multi-step reasoning;
- document usefulness depends on task intent rather than topical similarity;
- specialized rerankers plateau below required quality;
- the candidate set is already small enough to control cost;
- downstream impact is sufficiently valuable.

---

## 22. Proposed Experiments

### EXP-CTX-001 — Reranking vs No Reranking

Existing foundational experiment.

Primary question:

> Does reranking improve repository-context precision and downstream task success enough to justify cost and latency?

This remains a P0 experiment.

### EXP-CTX-017 — Candidate Depth and Final Context Depth

Test combinations of:

```text
N = 10, 25, 50, 100, 200
K = 5, 10, 20
```

Measure retrieval quality, active-context tokens, total cost, latency, and downstream coding-agent success.

### EXP-CTX-018 — Specialized Reranker vs LLM Reranker

Compare:

```text
no reranker
specialized fast reranker
specialized quality reranker
general LLM reranker
reasoning-model reranker
```

The goal is not to identify one universal winner but to find the quality/cost frontier by task class.

### EXP-CTX-019 — Conditional vs Always-On Reranking

Compare:

```text
always rerank
vs
query/candidate-aware conditional reranking
```

Test whether obvious exact/symbol queries can bypass reranking while preserving quality on ambiguous semantic queries.

---

## 23. Open Questions Added by This Chapter

- How large should candidate sets be before reranking for different engineering workloads?
- Which reranker type best handles mixed code and prose?
- How should exact-match and structural evidence be preserved through reranking?
- When does a frontier LLM outperform a specialized reranker enough to justify the cost?
- Can candidate score distributions reliably determine when reranking is unnecessary?
- Should rerankers receive raw chunks, structured metadata, contextualized chunks, or multiple representations?
- How should diversity selection interact with relevance reranking?
- Which reranking metrics correlate with downstream coding-agent success?

---

## 24. Recommended Baseline Architecture

Until the platform experiments provide stronger internal evidence, use this as a conceptual baseline for large mixed engineering corpora:

```text
                 query
                   │
                   ▼
           query classification
                   │
                   ▼
        retrieval portfolio / routing
     ┌─────────────┼──────────────┐
     │             │              │
   exact        lexical        semantic
     │             │              │
     └─────────────┼──────────────┘
                   ▼
            candidate fusion
                   │
                   ▼
        reranking decision gate
          │                 │
        skip              rerank
          │                 │
          └────────┬────────┘
                   ▼
       dedupe / diversity selection
                   │
                   ▼
          context-budget selection
                   │
                   ▼
                 agent
```

This architecture intentionally keeps retrieval, reranking, diversity, authorization, and context selection as distinct concerns.

---

## 25. Current Recommendation Status

**Recommended:**

- preserve reranking as a first-class retrieval capability;
- use specialized rerankers as the initial baseline for ordinary semantic relevance;
- tune candidate depth and final context depth together;
- measure downstream agent outcomes;
- preserve exact/structural signals;
- separate relevance from trust and authorization;
- support bypassing reranking where it provides no value.

**Provisional:**

- conditional reranking as the the platform default;
- cascaded reranking;
- structured metadata representations for code reranking;
- LLM reranking for complex engineering relevance judgments.

These require the platform experiments.

---

## 26. External Evidence Snapshot

The following sources informed the initial version of this chapter and should be revisited according to the review interval:

- Anthropic, *Contextual Retrieval* — reports improved retrieval from reranking contextual BM25 + embeddings and explicitly discusses the candidate-depth cost/latency tradeoff.
  - https://www.anthropic.com/engineering/contextual-retrieval
- Cohere, *Rerank Models / Reranking* — current dedicated reranking models, including quality- and latency-oriented variants and support for semi-structured inputs.
  - https://docs.cohere.com/v2/docs/rerank
- Voyage AI, *Rerankers* — documents cross-encoder-style second-stage ranking after embedding or lexical retrieval and current reranker limits/capabilities.
  - https://docs.voyageai.com/docs/reranker

Vendor evidence is useful but not treated as vendor-neutral proof. the platform experiments should determine applicability to our workloads.

---

## 27. Summary

Reranking remains useful in modern agent systems because efficient first-stage retrieval and precise relevance judgment are different optimization problems.

The the platform position is not that every retrieval pipeline needs a reranker.

It is:

> Retrieve broadly enough to preserve useful evidence, then spend additional ranking compute only when doing so improves the information ultimately delivered to the agent.

The effectiveness of reranking should be judged by the complete system outcome: better evidence, smaller and cleaner context, greater task success, acceptable latency, and lower or justified total cost.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-context.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-CTX-003 — Retrieval Architecture](AEP-CTX-003-retrieval-architecture.md)
- [AEP-CTX-004 — Embeddings and Semantic Retrieval](AEP-CTX-004-embeddings-and-semantic-retrieval.md)
- [AEP-CTX-005 — Lexical and Hybrid Retrieval](AEP-CTX-005-lexical-and-hybrid-retrieval.md)
- [AEP-QUESTIONS-001 — Open Questions](../foundations/AEP-QUESTIONS-001-open-questions.md)
