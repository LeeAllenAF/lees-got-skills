---
schema_version: '1.0'
id: AEP-CTX-005
title: Lexical and Hybrid Retrieval
summary: 'Lexical and Hybrid Retrieval. Focus: hybrid search, lexical search, rank fusion.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- context-engineering
tags:
- hybrid-search
- lexical-search
- rank-fusion
scope:
- enterprise-global
related:
- AEP-CTX-003
- AEP-CTX-004
- AEP-QUESTIONS-001
- EXP-CTX-004
- EXP-CTX-011
- EXP-CTX-014
- EXP-CTX-015
- EXP-CTX-016
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 120d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/context/AEP-CTX-005-lexical-and-hybrid-retrieval.md
  original_sha256: 6dd4666064486f53fe0956f804b604c9df9b3f36b6f148a74d76b2ab9a3f08a8
  original_metadata_record: handbook/context/AEP-CTX-005-lexical-and-hybrid-retrieval.md
  authority: inherited-source-context
---

# AEP-CTX-005 — Lexical and Hybrid Retrieval

## 1. Purpose

This chapter defines the the platform working model for lexical retrieval and hybrid retrieval in agent systems, with software-development repositories and engineering knowledge bases as the primary workloads.

The chapter addresses a recurring mistake in modern agent systems: assuming that semantic/vector retrieval supersedes exact and lexical search.

It does not.

Engineering corpora contain unusually high-value literal tokens:

- symbol names;
- class and function names;
- file paths;
- package names;
- configuration keys;
- environment variables;
- error messages;
- exception names;
- API routes;
- identifiers;
- version numbers;
- issue IDs;
- database objects;
- infrastructure resource names.

These are often best retrieved through lexical or exact mechanisms.

At the same time, engineers frequently ask conceptual questions whose wording differs substantially from the implementation or documentation that answers them. These are often best served by semantic retrieval.

Hybrid retrieval combines those strengths.

The core design question is therefore not:

> Should the platform use lexical search or vector search?

It is:

> How should exact, lexical, semantic, structural, and second-stage ranking mechanisms cooperate for this workload?

---

## 2. Working Definitions

### Exact retrieval

Retrieval based on literal equality, prefix, substring, symbol identity, path identity, keyed metadata, or similarly deterministic matching.

Examples:

```text
P0430
AUTH_TOKEN_TTL
createPayment
src/payments/create-payment.ts
@apollo/server
customer_profile_id
```

Exact retrieval is usually the highest-precision option when the user already knows the identifier being sought.

### Lexical retrieval

Retrieval based primarily on words or tokens appearing in the corpus and query.

BM25 and BM25F are common lexical ranking methods.

Lexical systems typically reward terms according to factors such as:

- term occurrence;
- rarity across the corpus;
- document length;
- field weighting.

### Sparse retrieval

A broader family of retrieval systems using sparse representations. Traditional term-based systems such as BM25 are sparse. Learned sparse retrieval systems may also assign weights to expanded vocabulary terms.

the platform should not use `lexical` and `sparse` as exact synonyms in technical documentation.

### Semantic retrieval

Retrieval based on learned vector representations intended to capture semantic relatedness rather than requiring literal token overlap.

See AEP-CTX-004.

### Hybrid retrieval

A retrieval architecture that uses more than one retrieval signal—most commonly lexical and semantic retrieval—and combines the resulting candidate sets or rankings.

Hybrid retrieval may also incorporate:

- exact-match signals;
- metadata;
- structural relationships;
- recency;
- authority;
- popularity;
- repository topology;
- reranking.

---

## 3. Current the platform Position

the platform currently recommends:

1. **Preserve exact and lexical retrieval as first-class mechanisms.**
2. **Use semantic retrieval where conceptual similarity provides value.**
3. **Treat hybrid retrieval as a strong default candidate for mixed engineering corpora, not as an unconditional standard.**
4. **Prefer routing when query intent strongly predicts a superior retrieval mode.**
5. **Benchmark fusion and weighting rather than assuming equal contribution from lexical and semantic channels.**
6. **Evaluate downstream agent success, not only retrieval metrics.**

For a general engineering knowledge system, a reasonable baseline architecture is:

```text
query
  ↓
query analysis
  ↓
┌───────────────────────────────────────┐
│ exact / identifier retrieval          │
│ lexical retrieval                     │
│ semantic retrieval                    │
│ structural / metadata retrieval       │
└───────────────────────────────────────┘
  ↓
candidate normalization / union
  ↓
fusion
  ↓
optional reranking
  ↓
context selection
  ↓
agent
```

The exact combination should remain workload-dependent.

---

## 4. Why Lexical Retrieval Remains Important

Semantic retrieval is powerful when wording differs.

Lexical retrieval is powerful when wording is itself evidence.

In software engineering, literal tokens often carry unusually high information density.

Consider a query:

```text
Where is ERR_AUTH_017 handled?
```

An embedding may associate this with authentication error-handling concepts, but an exact or lexical search can directly locate the literal identifier.

Similarly:

```text
Where is X-Request-ID added?
```

```text
Who calls refreshAccessToken?
```

```text
Find references to FEATURE_CHECKOUT_V2.
```

```text
Where is the /v1/customers/:id route implemented?
```

These are not primarily semantic-retrieval problems.

A good agent system should recognize that distinction.

---

## 5. BM25 as a Baseline Lexical Retriever

BM25 remains a practical lexical-search baseline because it rewards query-term matches while compensating for common terms and document length.

the platform does not currently require a specific BM25 implementation or parameterization.

However, BM25-like retrieval should usually be included as a baseline when evaluating retrieval for text-heavy engineering corpora.

Important configuration choices include:

```text
tokenization
stemming
case handling
field boundaries
field boosts
stop words
k1
b
query operators
minimum token matching
```

These choices matter greatly for code and technical text.

---

## 6. Tokenization Is an Engineering Decision

Natural-language tokenization defaults can behave poorly for code-oriented terms.

Examples include:

```text
customerId
customer_id
CustomerRepository
AEP-CTX-005
/api/v2/customers
@enterprise/tools
ERR_AUTH_017
foo.bar.baz
```

A tokenizer may:

- preserve the token;
- lowercase it;
- split camelCase;
- split snake_case;
- remove punctuation;
- split paths;
- split package scopes;
- normalize Unicode;
- stem natural-language terms.

There is no universally correct choice.

Engineering corpora may benefit from indexing multiple representations of the same value.

For example:

```text
raw:
CustomerRepository

normalized:
customerrepository

decomposed:
customer repository
```

Likewise:

```text
raw:
customer_profile_id

decomposed:
customer profile id
```

This creates additional retrieval signals without discarding the exact representation.

---

## 7. Field-Aware Lexical Retrieval

Engineering artifacts contain fields with very different meanings.

For a source-code symbol, candidate fields might include:

```text
symbol_name
qualified_name
file_path
project
package
signature
comments
body
imports
summary
```

A match in `symbol_name` may deserve greater weight than the same term appearing in a comment.

For handbook content:

```text
document_id
title
headings
body
tags
technologies
status
scope
```

A query matching an exact document ID should not be ranked identically to one matching a body paragraph.

Where supported, the platform should evaluate BM25F or equivalent field-aware ranking rather than flattening every artifact into one text blob.

---

## 8. Exact Match Should Often Precede Ranked Retrieval

If the query contains a highly distinctive identifier, deterministic lookup may be superior to ranking.

Candidate recognizers include patterns for:

```text
file paths
UUIDs
issue IDs
error codes
package coordinates
function/class identifiers
URLs
schema fields
environment-variable names
commit hashes
```

An agent retrieval system can therefore perform query analysis before deciding how to search.

Example:

```text
query
  ↓
identifier extraction
  ↓
exact lookup succeeds?
  ├── yes → return / expand structurally
  └── no  → lexical / semantic retrieval
```

This is often cheaper and more reliable than forcing every query through the same hybrid pipeline.

---

## 9. Hybrid Retrieval

Hybrid retrieval combines signals that fail in different ways.

Lexical retrieval may miss:

> How do we make message handling safe to retry?

when the relevant document primarily discusses `idempotency`.

Semantic retrieval may miss or dilute:

> Find `PAYMENT_STATE_INVALID`.

A hybrid system allows each channel to contribute candidates.

Current search platforms commonly support this model directly. Elastic recommends Reciprocal Rank Fusion for hybrid full-text and vector search, while Weaviate supports both rank-based and normalized-score fusion with configurable lexical/vector weighting.

the platform should treat those vendor defaults as starting points rather than universal truths.

---

## 10. Candidate Generation and Fusion Are Separate Decisions

Hybrid search contains at least two independent questions:

### Candidate generation

Which retrieval systems produce candidates?

Example:

```text
BM25 top 50
vector top 50
exact matches
repo-map neighbors
```

### Fusion

How are these candidates combined into one ordering?

Conflating these decisions makes retrieval systems harder to evaluate.

the platform experiments should record both explicitly.

---

## 11. Score Fusion

One hybrid strategy normalizes scores from each retrieval channel and combines them.

Conceptually:

```text
hybrid_score =
  lexical_weight * normalized_lexical_score
  + semantic_weight * normalized_semantic_score
```

Advantages:

- preserves information about score magnitude;
- supports explicit weighting;
- can strongly favor one retrieval family.

Risks:

- lexical and semantic scores have different distributions;
- normalization method can materially alter rankings;
- weights tuned on one corpus may not generalize;
- score calibration may change after model or index upgrades.

Score fusion therefore requires careful evaluation.

---

## 12. Reciprocal Rank Fusion

Reciprocal Rank Fusion (RRF) combines result sets according to rank rather than attempting to compare raw relevance scores.

Conceptually:

```text
RRF(document) = Σ 1 / (k + rank_i(document))
```

where `rank_i` is the position of the document in retrieval channel `i`.

RRF has an important operational advantage:

> BM25 and vector similarity scores do not need to exist on comparable numeric scales.

That makes RRF an attractive baseline for hybrid retrieval.

Current Elastic and OpenSearch documentation both position RRF as a practical way to combine lexical and vector rankings without requiring raw score calibration.

### the platform guidance

Use RRF as an early baseline when:

- retrieval channels expose incompatible score scales;
- no tuned relevance dataset exists;
- simplicity and robustness are more important than fine-grained score weighting.

Do not assume RRF is always optimal.

Its rank-only behavior deliberately discards information about score magnitude.

---

## 13. Weighted Hybrid Search

Some systems expose an `alpha`-style parameter controlling semantic versus lexical influence.

Conceptually:

```text
alpha = 0.0 → lexical only
alpha = 1.0 → semantic only
```

Intermediate values blend the channels.

This can be useful, but a single global value may hide different query classes.

For example:

```text
"ERR_AUTH_017"
```

may deserve a strongly lexical configuration.

While:

```text
"how do we stop duplicate event processing?"
```

may deserve a strongly semantic configuration.

That motivates adaptive routing or adaptive weighting.

---

## 14. Hybrid-by-Default vs Retrieval Routing

Two reasonable architectures exist.

### Always-on hybrid

```text
query
  ↓
lexical + semantic
  ↓
fusion
```

Advantages:

- simple behavior;
- robust to mixed query types;
- fewer routing errors;
- easy operational model.

Costs:

- performs both searches for every query;
- may add unnecessary latency or compute;
- one retrieval mode may introduce noise;
- requires fusion configuration.

### Routed retrieval

```text
query
  ↓
query classifier / heuristics
  ↓
exact | lexical | semantic | hybrid | structural
```

Advantages:

- cheaper where one mechanism is clearly sufficient;
- allows specialized query handling;
- can improve precision for distinctive identifiers.

Costs:

- routing can fail;
- complexity increases;
- classifier itself may require maintenance or model cost;
- mixed-intent queries may need multiple channels anyway.

### Current the platform position

Both remain valid.

For the initial handbook implementation, **always-on hybrid is a strong baseline**, while **adaptive routing is a high-value experiment rather than an immediate requirement**.

See EXP-CTX-011.

---

## 15. Routing Does Not Necessarily Require an LLM

Retrieval routing can begin with deterministic features.

Examples:

```text
contains exact path → exact/path search
contains error-code pattern → lexical/exact search
contains quoted identifier → lexical-heavy
contains symbol signature → symbol index
contains conceptual question → semantic/hybrid
asks callers/dependencies → graph/static-analysis tool
```

A small model or classifier may become useful when query intent cannot be determined reliably through simple rules.

This aligns with the broader the platform principle:

> Earn every model call.

---

## 16. Query Expansion

Lexical retrieval can benefit from query expansion.

A user may ask:

```text
login token renewal
```

while the corpus uses:

```text
refresh token
access token rotation
credential renewal
```

Expansion may be produced by:

- curated synonym sets;
- domain dictionaries;
- acronym expansion;
- stemming;
- learned sparse models;
- small-model query rewriting;
- frontier-model query rewriting where justified.

Expansion should not erase the original query.

A useful model is:

```text
original query
   +
expanded terms
   +
identified exact tokens
```

This preserves literal precision while adding recall.

---

## 17. Code-Aware Query Expansion

Software systems contain aliases that are not ordinary linguistic synonyms.

Examples:

```text
customer → Customer, customers, customerId, customer_id
authentication → auth, OAuth, OIDC, token, session
Postgres → PostgreSQL, pg
repository → repo
```

Framework and project conventions may introduce additional vocabulary.

An the platform repository knowledge layer may eventually maintain project-specific terminology maps derived from:

- symbol indexes;
- package manifests;
- schema names;
- README files;
- ADRs;
- domain dictionaries.

These should be treated as retrievable metadata rather than permanently injected context.

---

## 18. Metadata Filtering Before Retrieval

When reliable metadata is available, filtering can prevent irrelevant candidates from entering ranking at all.

Examples:

```text
project = example
repository = payments-api
branch = main
status != deprecated
language = typescript
scope = production
version = current
```

Filtering is especially important for organizational knowledge because lexical or semantic similarity alone cannot determine authorization or applicability.

A highly relevant document from the wrong project must not be retrieved into a task merely because its text is similar.

Filtering is therefore both a relevance mechanism and, in some systems, part of the security boundary.

---

## 19. Hard Filters vs Soft Boosts

A filter removes candidates.

A boost changes ranking.

These should not be confused.

Use a hard filter for requirements such as:

```text
correct project
permitted repository
non-deprecated content
allowed classification
```

Use a boost for preferences such as:

```text
recent documents
same repository
current version
frequently referenced guidance
preferred source type
```

Hard constraints should not depend solely on ranking.

---

## 20. Retrieval Depth

Each retrieval channel needs an appropriate candidate depth.

For example:

```text
lexical top 50
semantic top 50
union
rerank top 60
return top 8
```

Too little first-stage depth can destroy recall before fusion or reranking has a chance to help.

Too much depth increases:

- latency;
- reranking cost;
- duplicate candidates;
- noise;
- context-selection complexity.

Candidate depth is therefore an experimental parameter rather than an arbitrary constant.

---

## 21. Deduplication

Hybrid retrieval frequently returns the same logical information through multiple indexed units.

Examples:

- the same function indexed as a symbol and a file chunk;
- documentation duplicated across README and generated docs;
- overlapping parent/child chunks;
- repeated excerpts from copied ADRs.

Candidates should therefore be deduplicated by logical identity where possible.

Useful keys may include:

```text
document ID
source URI
repository + commit + path + symbol
content hash
parent artifact ID
```

Semantic near-duplicate detection may supplement deterministic identity but should not replace it where stable IDs exist.

---

## 22. Diversity

The highest-scoring results are not necessarily the best context set.

Five nearly identical chunks may provide less useful information than three highly relevant chunks covering different aspects of the problem.

Diversity-aware selection mechanisms such as Maximal Marginal Relevance can trade a small amount of individual relevance for broader evidence coverage.

This is particularly useful when:

- top results are highly redundant;
- context budget is small;
- several subsystems may contribute to the answer.

Diversity selection should occur after adequate candidate generation. It cannot recover information that the retrieval stage never surfaced.

---

## 23. Reranking After Hybrid Retrieval

Hybrid fusion and reranking solve different problems.

Fusion combines evidence from multiple first-stage retrievers.

A reranker performs more expensive relevance estimation over the resulting candidate set.

A common pipeline is:

```text
lexical top N
semantic top N
      ↓
    fusion
      ↓
 fused top K
      ↓
   reranker
      ↓
 final top M
```

This remains a strong candidate architecture for engineering knowledge retrieval.

However, reranking cannot recover an item missing from all first-stage candidates.

Therefore:

> First-stage recall constrains second-stage quality.

See EXP-CTX-001.

---

## 24. Hybrid Retrieval for Source Code

Code retrieval requires special treatment because natural-language relevance is only one dimension.

A code-focused retrieval portfolio may include:

```text
exact symbol lookup
ripgrep / text search
BM25 over code-aware fields
semantic code embeddings
AST / language-server symbol search
call graph / dependency graph
repository map
Git history
reranking
```

For example, the query:

> Where do we create the customer-profile Apollo subgraph?

may benefit from semantic and lexical retrieval.

The query:

> What calls `buildSubgraphSchema`?

is primarily structural.

The query:

> Why do we refresh database credentials periodically?

may require semantic retrieval over both source code and architectural documentation.

The retrieval mechanism should follow the information need.

---

## 25. Agent-Directed Retrieval Changes the Architecture

Traditional RAG often assumes one retrieval event:

```text
question → retrieve → answer
```

An agent can instead perform iterative retrieval:

```text
question
  ↓
retrieve
  ↓
inspect result
  ↓
form new hypothesis
  ↓
search identifier
  ↓
inspect code
  ↓
follow dependency
  ↓
retrieve design rationale
  ↓
answer / act
```

This reduces the need for one initial search to perfectly predict all relevant context.

It also means retrieval quality should be evaluated at the **task level**, not only per-query.

A slightly weaker first query may still lead to successful agent exploration.

Conversely, an excellent standalone search result may not translate into successful task completion.

---

## 26. Retrieval Budgeting

Retrieval consumes several resources:

```text
latency
CPU
embedding inference
reranker inference
network calls
storage
model context
agent tool calls
```

A good retrieval system should therefore operate under budgets.

Potential budgets include:

```text
maximum retrieval rounds
maximum candidates
maximum reranked documents
maximum context tokens
maximum latency
maximum retrieval cost
```

The budget may vary by task class.

An interactive IDE lookup and an autonomous hour-long migration agent should not necessarily use identical retrieval limits.

---

## 27. Caching

Several retrieval stages may be cacheable:

- query embeddings;
- lexical results;
- semantic candidates;
- fused rankings;
- reranker results;
- parsed metadata;
- repository maps.

Cache keys must include all configuration that affects results.

For example:

```text
corpus version
index version
retriever configuration
embedding model/version
query
filters
fusion strategy
weights
reranker version
```

Stale retrieval results can be worse than a cache miss, particularly for active repositories.

---

## 28. Freshness and Version Awareness

Engineering knowledge changes.

A lexical match against an obsolete branch can be perfectly accurate and still harmful.

Retrieval candidates should therefore expose provenance such as:

```text
repository
branch / ref
commit
source version
document version
last modified
status
authority
scope
```

Freshness may be:

- a hard filter;
- a ranking boost;
- contextual metadata passed to a downstream reranker or agent.

Which is appropriate depends on the source.

---

## 29. Authorization Must Precede Relevance

A retrieval system must not retrieve content merely because it is relevant if the current principal or agent is not authorized to access it.

Conceptually:

```text
accessible corpus
      ↓
retrieval
      ↓
ranking
```

not:

```text
all corporate content
      ↓
retrieve sensitive document
      ↓
hope downstream logic removes it
```

This becomes especially important once the the platform knowledge system contains multiple permission scopes.

Security boundaries should be enforced as early in retrieval as the underlying infrastructure allows.

---

## 30. Evaluation Metrics

Useful first-stage retrieval metrics include:

```text
Recall@K
Precision@K
MRR
NDCG
Hit Rate
```

These remain valuable for controlled experiments.

However, the platform should additionally measure:

```text
context tokens delivered
time to first relevant evidence
agent tool calls
agent task success
repair/retry count
hallucination / unsupported claim rate
cost
latency
```

The objective is not to build the world's highest-scoring search benchmark.

The objective is to make agents more reliable and efficient.

---

## 31. Query-Class Evaluation

Aggregate retrieval metrics can hide important failures.

Evaluation datasets should label query classes such as:

```text
exact identifier
symbol lookup
error diagnosis
conceptual architecture
how-to / procedural
cross-document synthesis
repository navigation
historical rationale
configuration lookup
dependency tracing
```

Each retrieval architecture should be evaluated by class.

This is necessary for deciding whether routing is useful.

---

## 32. Failure Modes

### Semantic-only retrieval

May miss exact identifiers and mechanically important tokens.

### Lexical-only retrieval

May miss conceptually relevant material that uses different terminology.

### Global fixed hybrid weighting

May work adequately overall while performing poorly on specific query classes.

### Excessive candidate depth

Increases cost and noise without improving recall meaningfully.

### Insufficient candidate depth

Prevents fusion and reranking from seeing relevant documents.

### Score normalization errors

Can cause one retrieval family to dominate unintentionally.

### Tokenization mismatch

Can make code identifiers effectively invisible.

### Unscoped retrieval

Can mix repositories, scopes, versions, or obsolete guidance.

### Duplicate-heavy results

Waste context budget.

### Reranker overconfidence

Can reorder a good candidate set poorly or suppress useful diversity.

### Search without provenance

Produces context the agent cannot evaluate for authority or freshness.

---

## 33. Suspected Anti-Patterns

the platform currently considers the following likely anti-patterns:

### Vector Database Equals RAG

Treating the existence of a vector index as a complete retrieval architecture.

### Embeddings for Known Identifiers

Using semantic search where exact lookup is available and clearly superior.

### Hybrid Without Evaluation

Adding lexical and semantic scores together with arbitrary weights and treating the result as best practice.

### One Alpha Forever

Applying a single lexical/vector weighting to all query types without evidence.

### LLM Routing for Everything

Paying for model-based routing when deterministic query features would suffice.

### Rerank the Universe

Sending extremely large candidate sets to expensive rerankers instead of improving first-stage retrieval.

### Unauthorized Then Filter

Retrieving inaccessible data before applying access control.

### Ranking as Policy

Using a relevance boost where a hard scope, authority, or security constraint is required.

---

## 34. Recommended Baseline Architecture

For a mixed engineering corpus, the platform's initial implementation baseline should be approximately:

```text
                        query
                          │
                 query normalization
                          │
                 identifier detection
                          │
           ┌──────────────┴──────────────┐
           │                             │
      exact lookup                 retrieval path
                                         │
                      ┌──────────────────┼──────────────────┐
                      │                  │                  │
                   lexical           semantic          structural
                    BM25              vector           repo/graph
                      │                  │                  │
                      └──────────────────┼──────────────────┘
                                         │
                                      union
                                         │
                                  deduplication
                                         │
                                fusion (RRF baseline)
                                         │
                                optional reranker
                                         │
                          diversity / context selection
                                         │
                              provenance attachment
                                         │
                                      agent
```

This is a **baseline for testing**, not a mandatory final architecture.

---

## 35. Recommended Initial Defaults

Until internal experiments produce stronger evidence:

### Exact retrieval

Use first when clear identifiers are detected.

### Lexical retrieval

Include in mixed code/document corpora.

### Semantic retrieval

Include where natural-language conceptual discovery is important.

### Hybrid fusion

Use RRF as a simple first benchmark when lexical/vector scores are not calibrated.

### Reranking

Treat as optional and evaluate based on top-result precision, latency, and downstream token savings.

### Filters

Apply hard scope/security filters before ranking wherever possible.

### Metadata

Preserve source, version, scope, status, and authority in retrieved candidates.

### Routing

Begin with deterministic recognizers; experiment before adopting model-based query routing broadly.

---

## 36. Initial Experiment Proposals

### EXP-CTX-014 — Hybrid Fusion Strategies

Compare:

```text
lexical only
semantic only
RRF
relative-score fusion
fixed weighted fusion
query-class-aware weighting
```

Measure retrieval and downstream coding-agent outcomes.

### EXP-CTX-015 — Code-Aware Lexical Tokenization

Compare tokenization/index representations for:

```text
camelCase
PascalCase
snake_case
paths
package names
error codes
qualified symbols
```

Determine whether multi-representation indexing materially improves code retrieval.

### EXP-CTX-016 — Deterministic Query Routing vs Always-On Hybrid

Compare:

```text
always-on hybrid
```

against:

```text
deterministic query classification
  → exact / lexical / semantic / hybrid / structural
```

Measure:

- task success;
- retrieval recall;
- latency;
- search cost;
- downstream context tokens;
- routing failures.

These experiments supplement existing EXP-CTX-004 and EXP-CTX-011 rather than replacing them.

---

## 37. Open Questions Generated by This Chapter

The following questions should remain explicit:

- Should the platform use RRF or score fusion as its initial hybrid baseline?
- Which query classes benefit from hybrid search versus specialized routing?
- What code tokenization strategy best preserves exact identifiers while supporting useful decomposition?
- How deep should each first-stage retriever search before fusion?
- How should candidate duplication be detected across symbol, file, and documentation indexes?
- Does diversity-aware selection improve downstream coding-agent outcomes under tight context budgets?
- When does query expansion improve recall enough to justify its complexity?
- Can a deterministic router capture most of the value of model-based retrieval routing?
- How should freshness be incorporated without suppressing historically important architecture decisions?

---

## 38. the platform Guidance Summary

### Recommended

- Keep lexical retrieval first-class.
- Preserve exact identifiers rather than relying on semantics.
- Use hybrid retrieval as a strong baseline for mixed engineering corpora.
- Keep candidate generation, fusion, reranking, and context selection conceptually separate.
- Start hybrid evaluation with a robust rank-fusion baseline such as RRF.
- Apply authorization and hard scope constraints before relevance ranking.
- Preserve provenance through the retrieval pipeline.
- Evaluate retrieval by downstream agent task success as well as search metrics.

### Provisional

- Hybrid retrieval should be the default retrieval path for generic natural-language engineering queries.
- Deterministic query routing may outperform always-on hybrid for clearly identifiable query classes.
- Code-aware multi-representation tokenization will improve lexical retrieval enough to justify additional index complexity.
- Diversity-aware context selection may improve performance under tight context budgets.

### Not recommended as a default

- semantic-only retrieval for mixed software repositories;
- arbitrary score blending without evaluation;
- model-based query routing when simple deterministic rules suffice;
- using ranking weights to enforce access control;
- removing lexical retrieval merely because a strong embedding model is available.

---

## 39. External Evidence and References

Primary current references used for this chapter:

1. Elastic, **Hybrid search** — recommends RRF for combining lexical/full-text and vector retrieval.
   https://www.elastic.co/docs/solutions/search/hybrid-search

2. Elastic, **Reciprocal rank fusion** — documents rank-based fusion across result sets without requiring comparable raw relevance scores.
   https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion

3. OpenSearch, **Reciprocal rank fusion** — describes RRF for hybrid query clauses and emphasizes its usefulness when component score scales differ.
   https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/rrf/

4. Weaviate, **Hybrid search** — documents BM25 + vector retrieval, configurable alpha weighting, rank/relative-score fusion, and diversity selection.
   https://docs.weaviate.io/weaviate/concepts/search/hybrid-search

5. Weaviate, **Keyword Search (BM25)** — documents tokenization and keyword-search considerations.
   https://docs.weaviate.io/weaviate/concepts/search/keyword-search

6. Weaviate, **Search overview** — distinguishes keyword, vector, hybrid, boost, and rerank roles.
   https://docs.weaviate.io/weaviate/search

7. Elastic, **Ranking and reranking** — separates first-stage retrieval, hybrid fusion, semantic reranking, and learning-to-rank concepts.
   https://www.elastic.co/docs/solutions/search/ranking

These references inform the current position but do not themselves define the platform standards.

---

## 40. Conclusion

Lexical retrieval is not a legacy technique waiting to be replaced by embeddings.

For engineering systems, it remains one of the most valuable retrieval channels because source code and infrastructure contain exact tokens whose literal identity matters.

Semantic retrieval solves a different problem: discovering relevant information despite vocabulary mismatch.

Hybrid retrieval is valuable because these mechanisms fail differently.

The the platform objective is therefore not to choose a winner between lexical and semantic search.

It is to construct a retrieval system that can use the right evidence source at the right time, combine those signals intelligently, preserve scope and provenance, and deliver the smallest set of context that allows the agent to succeed.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-context.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-CTX-003 — Retrieval Architecture](AEP-CTX-003-retrieval-architecture.md)
- [AEP-CTX-004 — Embeddings and Semantic Retrieval](AEP-CTX-004-embeddings-and-semantic-retrieval.md)
- [AEP-QUESTIONS-001 — Open Questions](../foundations/AEP-QUESTIONS-001-open-questions.md)
