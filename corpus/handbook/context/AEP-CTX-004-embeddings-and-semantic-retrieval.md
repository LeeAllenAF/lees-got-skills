---
schema_version: '1.0'
id: AEP-CTX-004
title: Embeddings and Semantic Retrieval
summary: 'Embeddings and Semantic Retrieval. Focus: embeddings, indexing, semantic search.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- context-engineering
tags:
- embeddings
- indexing
- semantic-search
scope:
- enterprise-global
related:
- AEP-CTX-001
- AEP-CTX-003
- AEP-QUESTIONS-001
- EXP-CTX-004
- EXP-CTX-012
- EXP-CTX-013
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 120d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/context/AEP-CTX-004-embeddings-and-semantic-retrieval.md
  original_sha256: 07c8af0dcc421637736a249581367d03f763439908f564c69028f6f7e2a14016
  original_metadata_record: handbook/context/AEP-CTX-004-embeddings-and-semantic-retrieval.md
  authority: inherited-source-context
---

# AEP-CTX-004 — Embeddings and Semantic Retrieval

## 1. Purpose

This chapter defines the the platform working model for embeddings and semantic retrieval in agent systems, with software-development and engineering-knowledge workloads as the primary focus.

Embeddings are not treated as a default storage format or as a replacement for exact, lexical, structural, or agent-directed search. They are one retrieval mechanism in a broader retrieval portfolio.

The core design question is not:

> Which embedding model is best?

It is:

> Which representation, embedding configuration, index, retrieval strategy, and downstream ranking pipeline best serves this workload under its quality, latency, privacy, and cost constraints?

---

## 2. Working Definition

An embedding maps an input into a numeric vector intended to preserve useful aspects of semantic relatedness.

For retrieval, a query and candidate documents are represented as vectors and compared using a similarity or distance function. Semantically related items can therefore match even when they share few or no literal terms.

This is the principal advantage over lexical-only retrieval.

It is also the principal source of risk: semantic similarity is not the same as exact correctness, authority, freshness, structural relationship, or task usefulness.

---

## 3. Current the platform Position

Semantic retrieval is **recommended as a complementary retrieval channel**, not as a universal first-stage retriever.

For mixed software-engineering corpora, the platform currently favors an architecture in which semantic retrieval can be combined with:

- exact identifier lookup;
- lexical/BM25 search;
- metadata filtering;
- repository or graph structure;
- reranking;
- agent-directed exploration.

The system should select or combine these mechanisms according to the workload rather than assuming vector similarity is sufficient.

---

## 4. Where Semantic Retrieval Is Strong

Semantic retrieval is particularly useful when the user's language and the stored material describe the same concept differently.

Examples include:

- “Where is authentication refreshed?” matching code describing token renewal;
- “How do we prevent duplicate messages?” matching idempotency documentation;
- “customer deletion requirements” matching privacy-retention policies without exact term overlap;
- natural-language questions over architecture decisions or design documents;
- retrieval across differently phrased tickets, incidents, and operational notes.

It is therefore especially valuable for **concept discovery**.

---

## 5. Where Semantic Retrieval Is Weak

Semantic retrieval should not be expected to reliably replace exact or structural mechanisms for:

- symbol names;
- class/function identifiers;
- file paths;
- error codes;
- package names;
- version numbers;
- configuration keys;
- exact API signatures;
- line-level references;
- dependency edges;
- callers/callees;
- ownership boundaries;
- freshness or authority decisions.

For these cases, exact search, lexical retrieval, AST/symbol indexes, graph traversal, metadata, or repository tools may be superior.

A result can be semantically similar and still be the wrong implementation, an obsolete document, or a lower-authority source.

---

## 6. Embedding Configuration Is a System Decision

Modern embedding APIs expose more than a model name.

Relevant configuration dimensions can include:

```text
model family
model size / quality tier
code-specialized vs general-purpose
query vs document input mode
embedding dimensionality
numeric representation / quantization
chunk representation
metadata strategy
similarity metric
ANN index configuration
filtering
candidate count
reranking
```

The complete configuration should be versioned as part of the retrieval system.

A corpus indexed with configuration A should not be silently queried with incompatible configuration B.

---

## 7. Query and Document Asymmetry

Some current embedding systems distinguish between **query** and **document** inputs.

This matters because retrieval is an asymmetric task:

```text
short question / intent
        ↓
find
        ↓
longer evidence-bearing document
```

Where the selected embedding model supports task-specific query/document modes, the platform should evaluate and generally prefer the provider's retrieval-specific configuration rather than embedding both sides generically.

This configuration must be recorded in index metadata.

---

## 8. Code-Specialized Embeddings

Software repositories are not ordinary prose corpora.

Code contains:

- identifiers;
- syntax;
- comments;
- imports;
- type relationships;
- control flow;
- API usage;
- framework conventions;
- natural language embedded in names and documentation.

Current providers now offer embedding models explicitly optimized for code retrieval and coding-agent workloads.

the platform should therefore **not assume that a general-purpose embedding model is optimal for repository retrieval**.

However, specialization should be demonstrated on representative workloads rather than inferred from a product label.

### Candidate experiment

**EXP-CTX-013 — Code-Specialized vs General-Purpose Embeddings**

Compare downstream retrieval and coding-agent task success across a mixed repository corpus.

---

## 9. What Should Be Embedded?

The embedding unit is often more important than the database choice.

Naively embedding arbitrary fixed-size token windows can destroy structure.

For engineering corpora, candidate semantic units include:

### Source code

- function;
- method;
- class;
- module;
- exported symbol;
- component;
- resolver;
- route;
- infrastructure resource;
- test case;
- logical code block where syntax-aware boundaries are unavailable.

### Documentation

- section under a heading;
- ADR decision section;
- runbook procedure;
- API endpoint description;
- requirement;
- ticket or incident narrative;
- question/answer pair.

The preferred unit should preserve enough local context to be meaningful without making every candidate unnecessarily large.

---

## 10. Enriched Representations

The text embedded does not have to equal the raw source chunk.

A retrieval representation might contain:

```text
repository
file path
symbol name
symbol kind
parent symbol
module / project
imports or dependencies
signature
natural-language summary
raw content
```

For example:

```text
Repository: checkout-api
Path: src/payments/create-payment.ts
Symbol: createPayment
Kind: function
Project: payments

Creates a payment request after validating the customer and
constructing an idempotency key.

<source code>
```

This can make otherwise ambiguous chunks easier to retrieve.

But enrichment can also inject generated errors, duplicate information, or stale summaries.

Generated enrichment should therefore retain provenance and be reproducible or refreshable.

---

## 11. Chunking Strategy

Chunking should respect the information structure of the source whenever possible.

Current the platform preference:

```text
structure-aware chunking
        >
semantic/logical chunking
        >
fixed-size chunking as fallback
```

This is a working recommendation, not yet an approved standard.

### Why arbitrary chunks fail

Fixed windows can split:

- a function from its signature;
- a class across unrelated chunks;
- a Markdown heading from its content;
- an ADR decision from its rationale;
- a configuration declaration from the value it governs.

Chunk overlap reduces some boundary problems but also increases storage, duplicate candidates, and downstream token use.

### Experiment relationship

**EXP-CTX-005 — Documentation Chunking Strategies** should eventually include structure-aware and fixed-window baselines.

---

## 12. Large Chunks Are Not Automatically Better

Longer embedding-model context windows allow larger inputs, but that does not imply that large chunks produce better retrieval.

A large document may contain several unrelated semantic topics. A single vector compresses those topics into one representation.

The engineering objective is therefore not:

> Maximize chunk size.

It is:

> Preserve the smallest useful semantic unit while retaining the context required to interpret it.

Parent/child retrieval may be useful here:

```text
retrieve small semantic child
        ↓
return child + selected parent context
```

This separates retrieval precision from final-context completeness.

---

## 13. Dimensionality

Higher-dimensional vectors require more storage and memory and can increase index/search cost.

Modern embedding systems increasingly support reduced dimensions, including Matryoshka-style embeddings designed to retain useful retrieval properties when truncated or generated at smaller dimensions.

the platform should therefore treat dimensionality as an optimization parameter rather than an immutable model property.

A reduction in dimension may be worthwhile when it meaningfully reduces:

- vector storage;
- RAM usage;
- network transfer;
- indexing time;
- search latency;

without materially reducing downstream retrieval quality.

### Candidate experiment

**EXP-CTX-012 — Embedding Dimension and Quantization Tradeoffs**

Measure retrieval quality, downstream task success, storage, index size, and latency across supported dimensions and representations.

---

## 14. Quantization and Numeric Representation

Some current embedding APIs and vector databases support lower-precision forms such as:

- float32;
- int8;
- uint8;
- binary embeddings;
- database-side scalar or product quantization.

These can materially reduce storage and improve search efficiency.

They can also reduce ranking fidelity.

the platform should avoid assuming that full-precision vectors are always necessary, particularly for large corpora where a reranker follows candidate retrieval.

The relevant metric is **end-to-end task quality**, not isolated nearest-neighbor fidelity.

---

## 15. Similarity Metrics

Common metrics include:

- cosine similarity;
- dot product;
- Euclidean distance.

The correct metric depends upon the embedding model and index assumptions.

For normalized embeddings, cosine similarity and dot product may yield equivalent rankings, and Euclidean distance can also be rank-equivalent under normalization.

the platform should follow the embedding provider's recommended metric unless internal evaluation demonstrates a reason not to.

Metric choice and normalization behavior must be recorded with the index configuration.

---

## 16. Approximate Nearest Neighbor Search

Large vector corpora generally use approximate nearest neighbor (ANN) indexes instead of exhaustive comparison.

Common index families include graph-based approaches such as HNSW and partition/quantization approaches used by various vector systems.

ANN introduces an explicit tradeoff:

```text
search speed / memory
        ↕
recall
```

Index parameters should not be optimized in isolation.

A slightly lower first-stage recall may be acceptable when hybrid retrieval, generous candidate pools, or reranking compensate for it.

Conversely, aggressive ANN optimization can permanently remove relevant evidence before reranking ever sees it.

---

## 17. Metadata Filtering

Semantic similarity should often operate inside a filtered search space.

Useful metadata can include:

```text
client
repository
branch
project
language
framework
path
symbol type
document type
version
created_at
updated_at
status
authority
trust level
knowledge maturity
```

Examples:

> Search only approved the platform guidance.

> Search only this repository and branch.

> Search active ADRs, excluding deprecated decisions.

> Search GraphQL code in the customer-profile project.

Filtering can improve precision and enforce isolation or policy boundaries.

Security-critical boundaries must not rely only on model interpretation of retrieved metadata; access control should be enforced by the retrieval service or datastore.

---

## 18. Hybrid Retrieval

Semantic retrieval and lexical retrieval solve different failure modes.

Lexical search is strong for exact identifiers and terminology.

Semantic search is strong for conceptual equivalence and vocabulary mismatch.

For engineering knowledge, the platform currently considers hybrid retrieval a strong default candidate when both mechanisms are available.

Conceptually:

```text
                query
                  │
          ┌───────┴───────┐
          ▼               ▼
       lexical         semantic
       search           search
          │               │
          └───────┬───────┘
                  ▼
             merge/fuse
                  ▼
               rerank
                  ▼
          context selection
```

This recommendation remains subject to **EXP-CTX-004**.

---

## 19. Reranking Changes the Embedding Optimization Problem

If a second-stage reranker evaluates first-stage candidates more deeply, the embedding retriever does not need to perfectly rank the final context.

Its responsibility becomes:

> Retrieve a candidate set with sufficiently high recall at acceptable cost and latency.

This can justify:

- smaller embedding models;
- lower dimensions;
- quantized vectors;
- larger candidate sets;
- faster ANN parameters;

if the reranker can recover final precision.

This is why embedding benchmarks alone are insufficient for the the platform use case.

---

## 20. Semantic Scores Are Not Universal Confidence Scores

A similarity score should not automatically be interpreted as confidence that a result is correct or sufficient.

Scores vary with:

- model;
- corpus;
- query style;
- chunk length;
- normalization;
- index behavior;
- candidate distribution.

Hard-coded global thresholds such as:

```text
similarity > 0.80 = relevant
```

should be treated with suspicion unless calibrated on the actual workload.

Thresholds should be empirically derived and versioned with the retrieval configuration.

---

## 21. Index Freshness and Re-Embedding

Semantic indexes can silently become stale.

Changes requiring consideration include:

- source content changes;
- branch changes;
- metadata changes;
- model upgrades;
- representation-template changes;
- chunking changes;
- dimension changes;
- permission changes.

Each indexed record should carry enough metadata to determine whether it is still valid.

Recommended minimum metadata:

```text
source_id
source_version / content_hash
chunker_version
representation_version
embedding_provider
embedding_model
embedding_model_version where available
embedding_dimension
embedding_dtype
embedded_at
security_scope
```

Re-indexing should be incremental where practical.

---

## 22. Model Migration

Changing embedding models is a data migration.

It should not be treated like changing a stateless generation-model name.

A model migration may require:

1. creating a new index/version;
2. re-embedding the corpus;
3. dual-running retrieval;
4. comparing quality and operational metrics;
5. shifting traffic;
6. retiring the old index only after validation.

Where a provider explicitly supports compatible embedding spaces across model tiers, that capability may reduce migration or query-time cost, but compatibility should be documented rather than assumed.

---

## 23. Hosted vs Local Embeddings

The decision should include more than per-token price.

### Hosted advantages

- low operational overhead;
- rapid access to strong models;
- managed scaling;
- simple upgrades.

### Local/open-weight advantages

- stronger data control;
- predictable infrastructure boundaries;
- offline capability;
- potentially favorable economics at sustained volume;
- tunable deployment characteristics.

### Costs of local operation

- model hosting;
- GPU/CPU capacity;
- scaling;
- upgrades;
- monitoring;
- batching;
- reliability;
- security patching.

For enterprise work, privacy and contractual data-handling constraints may dominate raw inference cost.

---

## 24. Sensitive and Private Data

Embeddings are derived representations of source material, not automatically anonymous data.

They should receive data-governance treatment appropriate to the underlying content and threat model.

the platform systems should document:

- which provider receives source content;
- retention behavior;
- region/residency options;
- tenant isolation;
- whether vectors cross permission boundaries;
- access-control enforcement;
- deletion/re-indexing behavior.

Permission isolation must be enforced at the data/retrieval layer, not delegated to prompt instructions.

---

## 25. Evaluation

Embedding evaluation should happen at multiple levels.

### Retrieval-level metrics

Possible metrics include:

- Recall@K;
- Precision@K;
- MRR;
- nDCG;
- hit rate;
- latency;
- index size;
- query cost.

### Agent-level metrics

More important for the platform:

- coding task success;
- correct file/symbol discovery;
- number of additional search/tool calls;
- context tokens consumed;
- hallucinated dependencies;
- human intervention;
- end-to-end latency;
- total cost.

A retrieval configuration that wins nDCG but makes the coding agent worse is not the better system.

---

## 26. Build Evaluation Sets From Real Questions

Synthetic semantic-similarity tests are insufficient.

The retrieval dataset should eventually contain realistic tasks such as:

```text
Where is RDS IAM token refresh implemented?

Which package owns GraphQL request-context creation?

What code determines the deployment namespace for this service?

Which ADR explains why this repository uses ESM?

Where is this error message produced?

What tests cover customer profile federation behavior?
```

Each query should have one or more known relevant artifacts, with notes for ambiguous or partially relevant results.

Over time, production search failures should become new evaluation cases.

---

## 27. Recommended Initial Architecture

For a medium-to-large engineering corpus, the platform should begin evaluation with something approximately like:

```text
                         query
                           │
                    query analysis
                           │
                 metadata / scope filters
                           │
             ┌─────────────┴─────────────┐
             │                           │
             ▼                           ▼
      lexical / exact              embeddings
         retrieval                  retrieval
             │                           │
             └─────────────┬─────────────┘
                           ▼
                    candidate fusion
                           │
                       reranker
                           │
                 diversity / dedupe
                           │
                  context budgeting
                           │
                      agent
```

Structural repository retrieval may operate as a third first-stage channel where appropriate.

This is a **baseline for experimentation**, not an approved universal architecture.

---

## 28. Initial the platform Guidance

### AEP-CTX-004-G01 — Do not default to embeddings alone

For software engineering corpora, semantic search should coexist with exact, lexical, or structural retrieval where those signals matter.

**Status:** Recommended

### AEP-CTX-004-G02 — Evaluate the whole retrieval configuration

Model, dimensions, representation, chunking, index, filters, candidate count, and reranking should be considered together.

**Status:** Recommended

### AEP-CTX-004-G03 — Preserve semantic structure when chunking

Prefer source-aware semantic units over arbitrary fixed token windows where practical.

**Status:** Provisional / recommended

### AEP-CTX-004-G04 — Use query/document modes when supported and validated

Retrieval-specific asymmetric embedding modes should generally be preferred over generic embedding when the provider supports them.

**Status:** Recommended

### AEP-CTX-004-G05 — Treat embedding-model changes as index migrations

Do not silently query an existing index with an incompatible embedding configuration.

**Status:** Approved candidate

### AEP-CTX-004-G06 — Similarity is relevance evidence, not authority

Semantic proximity must not override source authority, permissions, freshness, or policy status.

**Status:** Approved candidate

### AEP-CTX-004-G07 — Optimize end-to-end task quality

Embedding benchmark scores are secondary to downstream agent performance under realistic cost and latency budgets.

**Status:** Recommended

---

## 29. Suspected Anti-Patterns

### AP-EMB-001 — Vector Database Equals Retrieval Architecture

Selecting a vector database before defining workload, corpus, evaluation, and retrieval behavior.

### AP-EMB-002 — Embed Everything the Same Way

Using identical arbitrary chunking and representation for code, Markdown, tickets, ADRs, and configuration.

### AP-EMB-003 — Semantic Search for Exact Identifiers

Relying on vectors for tasks better solved by exact or lexical lookup.

### AP-EMB-004 — Global Similarity Thresholds Without Calibration

Treating embedding similarity as a universal probability of relevance.

### AP-EMB-005 — Model Upgrade Without Reindex Strategy

Changing embedding configuration without explicit compatibility or migration.

### AP-EMB-006 — Benchmark-Driven Model Selection Alone

Choosing a model solely from public embedding leaderboards without validating the target corpus and downstream agent tasks.

### AP-EMB-007 — Ignoring Metadata and Security Scope

Searching the entire corpus semantically and expecting the model to filter inappropriate or unauthorized results afterward.

---

## 30. Open Questions Generated by This Chapter

- **Q-RET-009:** Do code-specialized embedding models materially improve downstream coding-agent performance over strong general-purpose embeddings?
- **Q-RET-010:** What embedding dimension provides the best quality/storage/latency frontier for the platform engineering corpora?
- **Q-RET-011:** How much retrieval quality is lost through vector quantization, and does reranking erase that loss?
- **Q-RET-012:** Which source-aware representation template works best for code symbols?
- **Q-RET-013:** When should parent/child retrieval be used instead of embedding larger chunks directly?
- **Q-RET-014:** Which embedding-level metrics correlate most strongly with downstream agent task success?

---

## 31. Experiments Generated by This Chapter

### EXP-CTX-012 — Embedding Dimension and Quantization Tradeoffs

Compare supported dimensions and vector representations while measuring retrieval metrics, index size, memory, latency, and downstream coding-agent success.

### EXP-CTX-013 — Code-Specialized vs General-Purpose Embeddings

Compare one or more code-specialized models with strong general-purpose embedding models across representative repositories and mixed code/documentation queries.

These experiments should reuse the corpus and grading fixtures created for **EXP-CTX-004 — Vector vs Lexical vs Hybrid Retrieval** wherever possible.

---

## 32. Current External Evidence

This chapter is informed by current vendor documentation and should not treat vendor claims as independent proof.

### OpenAI

OpenAI documents embeddings as a semantic-search mechanism and currently exposes `text-embedding-3-small` and `text-embedding-3-large`. Its documentation supports configurable dimensions for the v3 family and recommends cosine similarity; OpenAI states its embeddings are normalized, making cosine and Euclidean ranking equivalent in that setting. The guide also includes code-search examples using natural-language queries against embedded functions.

Source: https://developers.openai.com/api/docs/guides/embeddings

OpenAI's current retrieval documentation emphasizes that semantic retrieval can match relevant content with little or no keyword overlap.

Source: https://developers.openai.com/api/docs/guides/retrieval

### Voyage AI

Voyage currently exposes general-purpose and code-specialized embedding models, including `voyage-code-4`, and supports configurable dimensions and multiple output data types. Its retrieval API distinguishes query and document input types.

Source: https://docs.voyageai.com/docs/embeddings

### Cohere

Cohere currently separates search query and search document embedding modes. Its September 30, 2026 Embed 5 release exposes quality- and latency-oriented model variants sharing an embedding space, flexible dimensions, multiple numeric representations, and support for code and multimodal enterprise data.

Sources:
- https://docs.cohere.com/docs/sem-search-quickstart
- https://docs.cohere.com/changelog/embed-v5

Cohere also documents reranking as a second-stage semantic operation that can reorder candidates from either lexical or vector retrieval.

Source: https://docs.cohere.com/docs/reranking-with-cohere

---

## 33. Conclusion

Embeddings remain a first-class component of modern agent retrieval systems, including coding systems.

Their role is narrower and more useful than the simplistic architecture:

```text
everything → vector database → top K → LLM
```

For the platform, the preferred mental model is:

```text
semantic retrieval
    =
one evidence-discovery channel
inside a larger retrieval and context-engineering system
```

The next research question is not whether embeddings work.

It is how semantic retrieval should interact with **lexical retrieval, exact search, structural information, reranking, and context budgets** to produce the smallest high-quality evidence set for an agent.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-context.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-CTX-001 — Context Engineering Fundamentals](AEP-CTX-001-context-engineering-fundamentals.md)
- [AEP-CTX-003 — Retrieval Architecture](AEP-CTX-003-retrieval-architecture.md)
- [AEP-QUESTIONS-001 — Open Questions](../foundations/AEP-QUESTIONS-001-open-questions.md)
