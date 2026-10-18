---
schema_version: '1.0'
id: AEP-CTX-003
title: Retrieval Architecture
summary: 'Retrieval Architecture. Focus: lexical search, reranking, retrieval, semantic search.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- context-engineering
tags:
- lexical-search
- reranking
- retrieval
- semantic-search
scope:
- enterprise-global
related:
- AEP-CTX-001
- AEP-CTX-002
- Q-RET-001
- Q-RET-002
- Q-RET-003
- Q-RET-004
- Q-RET-005
- EXP-CTX-001
- EXP-CTX-004
- EXP-CTX-006
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/context/AEP-CTX-003-retrieval-architecture.md
  original_sha256: 720065e9fbea7b54abb775a9cdfa4b63df9cba697d7288f7b1e09ea681ca81b5
  original_metadata_record: handbook/context/AEP-CTX-003-retrieval-architecture.md
  authority: inherited-source-context
---

# AEP-CTX-003 — Retrieval Architecture

## 1. Purpose

Retrieval is the process of locating information that is useful to the current reasoning step without permanently placing the entire available corpus into active model context.

For the platform systems, retrieval is not synonymous with vector search and is not limited to conventional retrieval-augmented generation (RAG).

A retrieval architecture may include:

- exact search;
- lexical ranking;
- semantic embeddings;
- metadata filters;
- repository structure;
- dependency or symbol graphs;
- generated repository maps;
- search tools operated directly by an agent;
- rerankers;
- query rewriting;
- task-specific routing;
- context-budget optimization.

The objective is not to maximize the number of retrieved items.

The objective is to deliver the **smallest set of information that gives the agent the evidence it needs to make the next good decision**.

---

## 2. Core Principle

> **Retrieval is context selection under uncertainty.**

Retrieval quality should therefore be measured not only by semantic similarity but by whether the retrieved information helps the agent complete the actual task.

This distinction matters especially for software repositories.

A bug report may mention a failing test while the necessary implementation file contains none of the same language. A changed interface may require updates to distant consumers that share dependency relationships but little textual similarity. A stack trace may identify a wrapper while the root cause lives several calls away.

Repository retrieval is therefore a workflow problem, not merely a nearest-neighbor problem.

---

## 3. Retrieval Is Not One Algorithm

the platform should treat retrieval as a portfolio of mechanisms.

```text
                         task / query
                              │
                   ┌──────────▼──────────┐
                   │ retrieval router    │
                   └──────────┬──────────┘
                              │
          ┌──────────┬────────┼────────┬──────────┐
          ▼          ▼        ▼        ▼          ▼
       exact      lexical   semantic  structural  agent
       search      search    search     maps      explore
          │          │        │        │          │
          └──────────┴────────┼────────┴──────────┘
                              ▼
                      candidate fusion
                              │
                      filters / reranker
                              │
                     context-budget packer
                              │
                              ▼
                         active context
```

No retrieval family should be assumed to dominate all tasks.

Current repository-level evidence supports this position. Agent Retrieval Bench (2026) found different methods leading different task types and metrics: embedding models led some ranking and recall metrics, while a RepoMap-style structural representation achieved the best budgeted context yield at an 8K-token budget. The benchmark explicitly found no single retrieval family dominating all workflow signals.

This should be treated as strong evidence against a universal retrieval strategy.

---

## 4. Retrieval Layers

A mature retrieval system can be viewed as a sequence of stages rather than a single search call.

```text
query / task state
      ↓
query understanding
      ↓
scope and metadata filtering
      ↓
candidate generation
      ↓
candidate fusion
      ↓
reranking / relevance estimation
      ↓
context packing
      ↓
agent consumption
      ↓
follow-up retrieval if needed
```

Each stage should exist only when it produces measurable value.

---

## 5. Query Understanding

The user request is not always the best retrieval query.

For coding tasks, useful retrieval signals can include:

- user language;
- filenames;
- symbols;
- error messages;
- stack traces;
- failing test names;
- package names;
- API routes;
- database entities;
- changed files;
- git diff context;
- dependency relationships;
- prior tool observations.

A retrieval system may therefore generate multiple search representations from one task.

Example:

```text
User request:
"Fix the customer profile mutation that stopped publishing events."

Possible retrieval probes:
- "customer profile mutation"
- GraphQL mutation field name
- event publisher interface
- SQS/event-bus abstraction
- tests referencing the mutation
- recent files touching publisher calls
```

Query expansion should be bounded. Generating dozens of speculative queries can cost more than it helps.

---

## 6. Scope Before Similarity

Where reliable metadata exists, narrowing the search space before ranking is often preferable to asking ranking alone to recover relevance.

Useful filters may include:

- repository;
- branch or commit;
- package/project;
- language;
- document type;
- ownership boundary;
- client;
- confidentiality classification;
- creation/update date;
- approved/deprecated status;
- generated vs source code;
- test vs production code.

This also provides a security benefit: data the agent is not authorized to access should be excluded before retrieval whenever practical.

Retrieval relevance must never become an authorization mechanism.

---

## 7. Exact Search

Exact search remains one of the highest-value retrieval mechanisms for software engineering.

Examples include:

- symbol names;
- error codes;
- environment variables;
- GraphQL fields;
- filenames;
- package names;
- configuration keys;
- test names;
- log fragments.

Simple mechanisms such as `grep`, `ripgrep`, language-server symbol search, and indexed identifier search can outperform embeddings when the query contains an exact artifact.

### the platform guidance

Do not replace exact search with semantic search merely because an embedding system exists.

Prefer exact or structural lookup when the task already identifies a precise symbol or artifact.

---

## 8. Lexical Retrieval

Lexical search ranks documents by textual overlap. BM25 remains a common implementation.

Lexical retrieval is especially useful when exact terminology matters:

- error messages;
- unique identifiers;
- API names;
- acronyms;
- configuration flags;
- technical terms;
- library names.

Anthropic's Contextual Retrieval work highlights this property directly: semantic search can retrieve conceptually related material while missing a unique string that lexical retrieval finds easily.

Lexical search is inexpensive, explainable, and frequently a strong baseline.

It should normally be included in the platform retrieval experiments rather than treating embeddings as the baseline by default.

---

## 9. Semantic Retrieval

Embedding retrieval represents queries and candidate content in a vector space and retrieves semantically related items.

Its primary advantage is conceptual matching when the query and evidence use different vocabulary.

Examples:

```text
"credentials keep expiring"
```

may retrieve documentation describing:

```text
"IAM database authentication tokens have a fifteen-minute validity period"
```

even when the strings share few tokens.

Semantic retrieval is particularly useful for prose, documentation, design rationale, support knowledge, and natural-language descriptions of code behavior.

### Limitations

Embedding similarity does not establish task relevance.

Semantic retrieval may return code that is conceptually related but not part of the execution path, ownership boundary, or required change.

Repository-scale benchmarks published in 2026 show that embedding performance drops substantially when moving from traditional isolated code-search tasks to requirement-driven repository retrieval.

---

## 10. Hybrid Retrieval

Hybrid retrieval combines lexical and semantic candidate generation.

A typical architecture is:

```text
              query
            /       \
           ▼         ▼
        lexical    semantic
           │         │
           └────┬────┘
                ▼
             fusion
                ▼
            candidates
```

Fusion may use Reciprocal Rank Fusion (RRF), normalized scores, learned combination weights, or another method.

OpenAI's current retrieval platform explicitly supports balancing embedding and text components in hybrid search, reflecting the practical value of both signals.

### the platform working recommendation

For mixed engineering knowledge containing both prose and exact identifiers, hybrid retrieval is the default architecture worth testing first.

This is a **recommended starting point**, not yet an the platform standard.

EXP-CTX-004 should validate this assumption against representative code and documentation workloads.

---

## 11. Contextualized Chunks

Traditional chunking can remove information required to understand or retrieve a fragment.

For example:

```text
"The retry period is ten minutes."
```

is weak retrieval content without knowing which service, subsystem, environment, or policy it describes.

A contextualized representation can retain or generate identifying information alongside the chunk.

Useful context may include:

- document title;
- section hierarchy;
- package/module;
- symbol name;
- enclosing class or function;
- repository path;
- dependency role;
- concise parent-document summary.

Anthropic reported substantial improvements from contextualized lexical and embedding retrieval in its published experiments, with further gains when reranking was added.

Those results are domain-specific and should not be interpreted as guaranteed the platform performance, but the underlying problem—chunks losing identifying context—is broadly applicable.

---

## 12. Reranking

Reranking takes an initial candidate set and applies a more expensive relevance model to reorder or filter it.

```text
large corpus
    ↓
cheap candidate retrieval
    ↓
50–200 candidates
    ↓
reranker
    ↓
5–20 high-value candidates
    ↓
context packing
```

Reranking remains useful in modern agent systems because retrieval and reasoning have different objectives.

The frontier model should not need to spend expensive context and reasoning capacity identifying irrelevant search results if a cheaper ranker can perform that task effectively.

### When reranking is most promising

- large corpora;
- noisy candidate sets;
- hybrid retrieval;
- expensive downstream model calls;
- strict context budgets;
- high-value tasks where missing relevant evidence is costly.

### When reranking may not be worthwhile

- tiny candidate sets;
- exact identifier lookup;
- latency-critical interactions;
- small corpora that fit comfortably in context;
- retrieval already dominated by deterministic structural lookup.

### the platform position

Rerankers remain a first-class tool.

They should not be universally required.

EXP-CTX-001 should measure whether reranking improves **downstream task quality and context efficiency**, not merely standalone ranking metrics.

---

## 13. Repository Maps and Structural Retrieval

Codebases contain structure unavailable to normal text search.

Examples include:

- directory hierarchy;
- exports/imports;
- call relationships;
- inheritance;
- GraphQL schema relationships;
- dependency graphs;
- Nx project graphs;
- package boundaries;
- test-to-source relationships;
- ownership metadata.

Repository maps compress some of this structure into a representation an agent can inspect or search.

This is particularly attractive because the map can expose **where to look** without consuming the context required to read every implementation file.

Agent Retrieval Bench's 2026 results are notable here: RepoMap achieved the strongest budgeted context yield at an 8K-token budget despite embeddings leading other metrics.

That suggests repository structure can be particularly valuable when context itself is scarce.

### the platform implication

Repository maps should be treated as a complementary retrieval channel rather than merely as prompt decoration.

EXP-CTX-006 should compare several map styles, including a lightweight project/file map and richer symbol/dependency maps.

---

## 14. Agent-Directed Exploration

Classical RAG generally assumes a retrieval system chooses context before generation.

Coding agents change this architecture.

A capable agent can interactively search the environment:

```text
inspect repo root
    ↓
identify likely project
    ↓
search symbol
    ↓
read implementation
    ↓
inspect dependencies
    ↓
run test
    ↓
use failure as a new retrieval signal
```

This is **agent-directed retrieval**.

SWE-Explore (2026) reports that agentic explorers form a clear tier above classical retrieval approaches on repository-exploration tasks, while also showing that efficient line-level ranking remains difficult.

This suggests that retrieval architecture for coding agents should not be designed as a one-shot RAG pipeline.

Instead, retrieval should support iterative navigation.

---

## 15. Retrieval as a Tool Loop

A coding agent often benefits from alternating reasoning and retrieval:

```text
observe
  ↓
form hypothesis
  ↓
retrieve
  ↓
inspect
  ↓
update hypothesis
  ↓
retrieve again
```

The system should therefore optimize both:

1. **seed context** — enough information to begin intelligently; and
2. **exploration tools** — efficient mechanisms for discovering additional context.

Seed retrieval that is too weak wastes exploration steps.

Seed retrieval that is too large wastes tokens and may anchor the model on irrelevant information.

---

## 16. Context-Budgeted Retrieval

Retrieval should optimize usefulness under a context budget.

This differs from optimizing only Recall@K.

Consider two results:

```text
Retriever A
20 files returned
9 relevant
42,000 tokens

Retriever B
8 files returned
6 relevant
7,500 tokens
```

For an agent operating under an 8K retrieval budget, Retriever B may be much more useful despite lower absolute recall.

Useful retrieval metrics should therefore include:

- recall;
- precision;
- ranking quality;
- relevant tokens per context token;
- relevant files per token budget;
- time-to-first-relevant-context;
- downstream task success;
- post-seed exploration cost.

the platform experiments should avoid evaluating retrieval only with generic IR metrics.

---

## 17. Context Packing

After retrieval and reranking, results still need to be assembled into active context.

Packing decisions include:

- number of items;
- ordering;
- chunk boundaries;
- neighboring context;
- duplicate removal;
- source metadata;
- truncation;
- source diversity;
- token allocation.

A reasonable default ordering is not necessarily "highest relevance score first."

The final package may benefit from structural grouping such as:

```text
repository overview
relevant implementation
related interfaces
relevant tests
applicable standards
supporting documentation
```

Packing should preserve provenance so the agent can distinguish sources.

---

## 18. Dynamic Top-K

A fixed `top_k` is convenient but often arbitrary.

The amount of context required may depend on:

- query specificity;
- task difficulty;
- candidate score distribution;
- available context budget;
- source diversity;
- model capability;
- whether the agent can retrieve more later.

A retrieval system may therefore use adaptive stopping rules.

Examples:

- stop when marginal relevance drops below a threshold;
- stop when a token budget is reached;
- require coverage across source types;
- retrieve more only if the agent requests it.

Current repository evidence also cautions against overconfidence in score thresholds. Agent Retrieval Bench found that thresholds calibrated on counterfactual controls did not reliably improve selective retrieval on natural no-gold cases.

Therefore retrieval scores should not automatically be interpreted as calibrated confidence.

---

## 19. Selective Retrieval and Abstention

Sometimes the correct retrieval result is **nothing**.

Examples:

- the needed information is external;
- the current repository is unrelated;
- the user supplied all necessary context;
- a deterministic tool already answered the question.

A retriever that always returns something can contaminate context with irrelevant evidence.

However, deciding when to abstain remains difficult.

the platform should treat abstention as a separately evaluated capability rather than assuming similarity thresholds solve it.

---

## 20. Retrieval Freshness

Retrieved information can become stale.

This is especially important for:

- source code;
- generated schemas;
- API documentation;
- deployment configuration;
- scoped requirements;
- package versions;
- model documentation.

Every indexed artifact should carry enough metadata to establish freshness where applicable.

Potential fields:

```yaml
source_commit: abc123
indexed_at: 2026-09-30T18:00:00Z
source_updated_at: 2026-09-30T17:52:00Z
version: 3.2.1
status: approved
```

For repository work, retrieving against the wrong commit can be worse than retrieving nothing.

---

## 21. Retrieval Security Boundaries

Retrieval must respect both information security and instruction security.

The system should enforce:

- authorization before candidate generation where possible;
- permission isolation;
- repository isolation;
- confidentiality filters;
- source provenance;
- trust metadata;
- prevention of retrieved data being silently promoted to trusted instruction.

A highly relevant malicious README is still malicious content.

Retrieval determines what the model sees. AEP-CTX-002 determines how that material may influence behavior.

---

## 22. Recommended Initial the platform Architecture

For large mixed engineering corpora, the initial architecture worth implementing and measuring is:

```text
Task / current agent state
          │
          ▼
   scope + metadata filter
          │
          ▼
   query decomposition
          │
     ┌────┼─────────────┐
     ▼    ▼             ▼
  exact  lexical      semantic
  search   BM25       embedding
     │      │             │
     └──────┼─────────────┘
            ▼
       rank fusion
            │
            ▼
     optional structural
     / repository signal
            │
            ▼
       candidate pool
            │
            ▼
      optional reranker
            │
            ▼
    context-budget packer
            │
            ▼
         agent
            │
            ▼
   iterative tool search
     when more is needed
```

This architecture is intentionally modular.

Each stage should be removable through configuration so experiments can isolate its value.

---

## 23. Coding-Agent Retrieval Strategy

For source repositories, the platform should initially expose multiple mechanisms rather than forcing all retrieval through a vector store.

A coding agent should normally have access to capabilities equivalent to:

```text
repo.tree
repo.searchText
repo.searchSymbol
repo.readFile
repo.findReferences
repo.dependencies
repo.projectGraph
repo.changedFiles
repo.testsFor
```

An optional retrieval service can provide ranked candidate files or regions, but direct agent exploration remains important.

The retrieval service should accelerate navigation, not prevent the agent from verifying the repository itself.

---

## 24. Knowledge-Base Retrieval Strategy

For the future the platform handbook knowledge service, the problem differs from source-code navigation.

The corpus will contain structured metadata and relatively curated content.

A likely pipeline is:

```text
request
  ↓
scope / project / status filters
  ↓
lexical + semantic retrieval
  ↓
rank fusion
  ↓
reranking
  ↓
policy / overlay resolution
  ↓
context-budget packing
  ↓
response with provenance
```

Because handbook content will carry stable document IDs and metadata, deterministic filtering should occur before semantic ranking wherever possible.

The MCP interface should expose resolved guidance rather than forcing every consuming agent to reconstruct this pipeline independently.

---

## 25. Retrieval Failure Modes

### 25.1 Semantic near-miss

The retrieved content is conceptually similar but operationally irrelevant.

### 25.2 Identifier miss

Embedding retrieval overlooks an exact technical term that lexical search would recover.

### 25.3 Chunk orphaning

A chunk loses enough parent context that it cannot be understood or retrieved correctly.

### 25.4 Structural blindness

Text retrieval misses dependency or execution relationships.

### 25.5 Context flooding

Too many weakly relevant results crowd out important context.

### 25.6 Stale retrieval

The correct information is returned for the wrong version, branch, or date.

### 25.7 Authority confusion

Retrieved content is incorrectly treated as trusted instruction.

### 25.8 False confidence

A high retrieval score is treated as proof that the correct evidence has been found.

### 25.9 Forced retrieval

The system returns unrelated results rather than recognizing that no useful local evidence exists.

### 25.10 One-shot retrieval

The system assumes the initial query can determine all necessary context before the agent begins investigating.

---

## 26. Retrieval Metrics

the platform should evaluate retrieval at multiple levels.

### Retrieval-level metrics

- Recall@K
- Precision@K
- MRR
- nDCG
- file coverage
- region coverage

### Context-efficiency metrics

- relevant tokens / retrieved tokens
- relevant files / token budget
- duplicate-token ratio
- budgeted context yield

### Agent-level metrics

- task success
- tool calls after seed retrieval
- time to first correct hypothesis
- unnecessary files inspected
- retries
- context tokens consumed
- total task cost
- latency

The agent-level metrics matter most.

A retriever that improves MRR but does not improve task outcomes may not justify operational complexity.

---

## 27. Experiment Program

### EXP-CTX-004 — Vector vs Lexical vs Hybrid Retrieval

Compare:

1. exact/lexical baseline;
2. BM25;
3. embedding retrieval;
4. lexical + embedding hybrid;
5. hybrid + structural features.

Evaluate across:

- issue → implementation;
- error → root cause;
- implementation → tests;
- requirement → documentation;
- code change → ripple effects.

### EXP-CTX-001 — Reranking vs No Reranking

Starting from the strongest candidate generator identified above, compare:

- no reranker;
- lightweight reranker;
- stronger reranker;
- frontier-model relevance scoring where economically sensible.

Measure retrieval metrics **and downstream coding-agent behavior**.

### EXP-CTX-006 — Repository Map Effectiveness

Compare:

- no map;
- directory/project map;
- symbol map;
- dependency graph summary;
- task-specific structural map.

### Future experiment — Adaptive Retrieval Routing

Determine whether routing query types to different retrieval channels outperforms always-on hybrid retrieval.

Potential classes:

```text
identifier lookup → exact/lexical
conceptual documentation → hybrid
stack trace → structural + lexical
ripple analysis → dependency graph + agent exploration
```

---

## 28. Initial the platform Guidance

### AEP-RET-G001 — Do not equate retrieval with vector search

Retrieval architecture should use the mechanism appropriate to the task.

**Status:** Recommended.

### AEP-RET-G002 — Preserve exact-match capability

Source-code and engineering retrieval systems should maintain lexical or exact-search capability even when semantic retrieval is available.

**Status:** Recommended.

### AEP-RET-G003 — Prefer hybrid retrieval as an experimental default for mixed engineering knowledge

Hybrid lexical + semantic retrieval is the preferred starting architecture for large corpora containing both prose and technical identifiers.

**Status:** Recommended, pending the platform validation.

### AEP-RET-G004 — Treat reranking as optional optimization

Reranking should be evaluated where candidate sets are noisy and downstream context is expensive.

Do not mandate reranking for all retrieval paths.

**Status:** Recommended.

### AEP-RET-G005 — Optimize for task utility under a context budget

Retrieval evaluation should include context efficiency and downstream task success, not only ranking metrics.

**Status:** Recommended.

### AEP-RET-G006 — Preserve iterative agent exploration

Coding agents should retain direct repository exploration capabilities even when a retrieval service supplies seed context.

**Status:** Recommended.

### AEP-RET-G007 — Use metadata and authorization before semantic ranking

Where deterministic scope, permission, version, or status filters exist, apply them before similarity-based retrieval.

**Status:** Recommended.

### AEP-RET-G008 — Preserve provenance and version identity

Every retrieved artifact should remain traceable to its source and version.

**Status:** Recommended.

---

## 29. Suspected Anti-Patterns

### AEP-RET-A001 — Embeddings Everywhere

Replacing deterministic or lexical lookup with embeddings without evidence of benefit.

### AEP-RET-A002 — Vector Store as Repository Model

Treating a vector database as though it fully represents repository structure and execution relationships.

### AEP-RET-A003 — Blind Top-K

Using a fixed number of retrieved chunks regardless of task complexity, score distribution, or context budget.

### AEP-RET-A004 — Ranking-Metric Optimization Only

Optimizing retrieval benchmarks without checking downstream agent task success.

### AEP-RET-A005 — Unversioned Retrieval

Serving repository or organizational knowledge without identifying the applicable source version.

### AEP-RET-A006 — Retrieval as Authorization

Assuming information is safe to expose merely because the retriever ranked it highly.

### AEP-RET-A007 — Permanent Preload

Keeping large bodies of retrievable knowledge resident in every agent context.

---

## 30. Decision Framework

Before introducing a retrieval component, ask:

```text
Can exact lookup solve this?
        │
      yes → use it
        │ no
        ▼
Does lexical overlap carry important signal?
        │
      yes → include lexical retrieval
        │
        ▼
Is conceptual matching required?
        │
      yes → include semantic retrieval
        │
        ▼
Is candidate precision insufficient?
        │
      yes → evaluate reranking
        │
        ▼
Does repository structure carry needed information?
        │
      yes → add structural retrieval
        │
        ▼
Can the agent discover more interactively?
        │
      yes → preserve exploration tools
```

This is a decision aid rather than a mandatory pipeline.

---

## 31. Relationship to Upcoming Chapters

AEP-CTX-003 defines the architecture-level retrieval model.

Later chapters should go deeper into individual components:

- **AEP-CTX-004 — Embeddings and Semantic Retrieval**
- **AEP-CTX-005 — Lexical and Hybrid Retrieval**
- **AEP-CTX-006 — Reranking**
- **AEP-CTX-007 — Progressive Disclosure**
- **AEP-CTX-010 — Repository Context and Code Intelligence**

The separation is intentional.

This chapter answers **how retrieval components fit together**.

Those chapters will answer **how each component should be engineered and evaluated**.

---

## 32. Current Conclusion

The evidence available in 2026 supports a retrieval philosophy that is heterogeneous, task-aware, and iterative.

Neither embeddings, lexical retrieval, structural maps, nor autonomous exploration should be treated as universally sufficient.

The likely the platform architecture is therefore not:

```text
query → vector DB → top K → LLM
```

but:

```text
              task
               │
      understand + constrain
               │
     select retrieval signals
               │
      gather candidates
               │
       rank / rerank
               │
   fit evidence to budget
               │
              agent
               │
       explore as needed
               │
        verify outcome
```

Retrieval is part of the agent's reasoning environment, not merely a preprocessing step.

---

# References

## REF-OPENAI-RETRIEVAL-2026
OpenAI. **Retrieval — OpenAI API Documentation.** Accessed 2026-09-30.  
https://developers.openai.com/api/docs/guides/retrieval

## REF-OPENAI-FILE-SEARCH-2026
OpenAI. **File Search — OpenAI API Documentation.** Accessed 2026-09-30.  
https://developers.openai.com/api/docs/guides/tools-file-search

## REF-ANTHROPIC-CONTEXTUAL-RETRIEVAL
Anthropic. **Contextual Retrieval in AI Systems.**  
https://www.anthropic.com/engineering/contextual-retrieval

## REF-ARB-2026
Qin, Bowen; Xie, Yi. **Agent Retrieval Bench: Evaluating Repository Context Retrieval for Coding Agents.** 2026.  
https://arxiv.org/abs/2607.24882

## REF-CORE-BENCH-2026
Zhang, Fuwei et al. **CORE-Bench: A Comprehensive Benchmark for Code Retrieval in the Era of Agentic Coding.** 2026.  
https://arxiv.org/abs/2606.11864

## REF-SWE-EXPLORE-2026
Zhang, Shaoqiu et al. **SWE-Explore: Benchmarking How Coding Agents Explore Repositories.** 2026.  
https://arxiv.org/abs/2606.07297

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-context.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-CTX-001 — Context Engineering Fundamentals](AEP-CTX-001-context-engineering-fundamentals.md)
- [AEP-CTX-002 — Context Sources and Instruction Hierarchy](AEP-CTX-002-context-sources-and-instruction-hierarchy.md)
- [HARNESS-FOUNDATIONS-03-CONTEXT-AND-STATE — Context engineering, retrieval, memory, and durable state](../../harness/foundations/03-context-and-state.md)
