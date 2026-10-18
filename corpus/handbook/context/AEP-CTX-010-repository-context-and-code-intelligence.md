---
schema_version: '1.0'
id: AEP-CTX-010
title: Repository Context and Code Intelligence
summary: 'Repository Context and Code Intelligence. Focus: code intelligence, repository discovery, retrieval.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- context-engineering
tags:
- code-intelligence
- repository-discovery
- retrieval
scope:
- enterprise-global
related:
- AEP-CTX-003
- AEP-CTX-005
- AEP-CTX-007
- AEP-P-016
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 120d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/context/AEP-CTX-010-repository-context-and-code-intelligence.md
  original_sha256: 884d517c931ba3ebd81ff8427defbb2fad7105b72cd9184cd8c06c2eea41c85f
  original_metadata_record: handbook/context/AEP-CTX-010-repository-context-and-code-intelligence.md
  authority: inherited-source-context
---

# AEP-CTX-010 — Repository Context and Code Intelligence

## 1. Purpose

Coding agents rarely fail only because they cannot generate code. They also fail because they do not know **where to look, which relationships matter, which files are authoritative, which tests encode behavior, or which parts of a repository should remain untouched**.

Repository context engineering is therefore the discipline of helping an agent discover and reason about the structure, behavior, history, and constraints of a software repository without forcing the repository into a tool or framework it does not otherwise need.

The objective is not to maximize repository information presented to the model.

The objective is to expose the smallest set of repository signals necessary to make a correct change.

---

## 2. Core principle: observe before prescribing

the platform adopts the following principle:

> **AEP-P-016 — Observe the Environment Before Prescribing Infrastructure**
>
> Agent systems should exploit the structure and tooling already present in a project before recommending new frameworks, orchestration layers, indexes, build systems, or repository abstractions. Additional infrastructure must solve an identified problem and justify its operational cost.

This principle applies to repository tooling such as:

- Nx;
- Turborepo;
- Bazel;
- language servers;
- AST indexes;
- vector databases;
- code graphs;
- repository maps;
- MCP servers;
- monorepo frameworks;
- custom indexing pipelines.

A small standalone React application should not be migrated into Nx merely because an agent can consume an Nx project graph.

A repository already using Nx may, however, expose that graph because it is authoritative structure that already exists.

The repository should inform the agent architecture. The agent architecture should not unnecessarily reshape the repository.

---

## 3. Repository intelligence is multi-source

No single repository representation is sufficient for every engineering task.

Useful sources include:

```text
Repository
   |
   +-- filesystem structure
   +-- package/build metadata
   +-- exact text
   +-- symbols and types
   +-- references and call relationships
   +-- dependency graph
   +-- build/test graph
   +-- semantic index
   +-- repository map
   +-- tests
   +-- runtime/configuration
   +-- git history
   +-- ownership/review metadata
   +-- generated artifacts
   +-- documentation and ADRs
```

These signals should be treated as complementary rather than competing sources.

---

## 4. Repository size should influence strategy

A five-file project and a five-hundred-thousand-file monorepo should not receive the same context architecture.

### Small repositories

A sufficiently small repository may be cheap enough to inspect directly.

Useful operations may include:

1. list files;
2. inspect package/build metadata;
3. read a small set of source files;
4. inspect tests;
5. run verification.

Building a vector index or graph service for such a repository may create more complexity than value.

### Medium repositories

Selective navigation becomes increasingly useful:

- grep/text search;
- file search;
- language-server references;
- symbol search;
- semantic retrieval;
- dependency metadata;
- targeted test discovery.

### Large repositories

Large repositories may justify precomputed or maintained structure such as:

- semantic indexes;
- symbol indexes;
- dependency graphs;
- repository maps;
- ownership maps;
- build graphs;
- specialized search services.

Scale alone still does not determine which mechanism should be used. Workload and update frequency matter.

---

## 5. Prefer live authoritative signals where practical

Repository knowledge can be either **observed live** or **precomputed**.

Examples of live signals:

- current filesystem;
- `package.json` or equivalent manifests;
- compiler output;
- language-server symbols;
- current git diff;
- current test failures;
- current build graph exposed by an existing tool.

Examples of precomputed signals:

- embedding indexes;
- symbol databases;
- repository maps;
- ownership indexes;
- knowledge graphs;
- cached summaries.

Live signals have strong freshness properties but may be slower to obtain repeatedly.

Precomputed signals can be fast and compact but introduce synchronization risk.

the platform guidance:

> Prefer live authoritative state for volatile facts. Use precomputed context where its retrieval value exceeds its freshness and maintenance cost.

---

## 6. Filesystem structure

Directory and file structure provide low-cost orientation.

Agents should usually be able to answer basic questions such as:

- Is this a single-package or multi-package repository?
- Where are source files located?
- Where are tests located?
- Which directories are generated?
- Are there separate frontend/backend packages?
- Are schemas, migrations, infrastructure, and documentation colocated or separated?

Filesystem structure should normally be discovered rather than permanently copied into global instructions.

Large directory trees should be filtered to avoid generated directories, dependencies, caches, binaries, coverage output, and other low-value material.

---

## 7. Package, workspace, and build metadata

Existing build/package tooling often contains useful structural truth.

Examples include:

- npm/pnpm/yarn workspace metadata;
- Cargo workspaces;
- Go modules;
- Maven/Gradle project structure;
- Bazel targets;
- Nx project graphs;
- Turborepo tasks;
- Make/CMake targets;
- language-specific module manifests.

Agents should consume these signals when present.

They should not require a project to adopt one merely to improve agent navigation.

### Example

In an existing Nx repository, an agent might use:

```text
list projects
   -> inspect project metadata
   -> inspect dependency graph
   -> identify relevant target
```

In a standalone React application, the equivalent orientation may simply be:

```text
package.json
   + src tree
   + tsconfig
   + bundler configuration
   + tests
```

Both approaches satisfy the same architectural goal: understand the repository using the structures already available.

---

## 8. Exact search remains essential

Code contains unusually high-value exact strings:

- symbol names;
- route names;
- error messages;
- environment variables;
- configuration keys;
- package names;
- GraphQL fields;
- database table names;
- feature flags;
- test descriptions.

Therefore, grep/text search remains a first-class code-intelligence mechanism even in repositories with semantic indexes.

Exact search is often the cheapest first step when the task already includes an identifier.

---

## 9. Symbol-aware navigation

Language-aware tools provide relationships that text search cannot reliably infer.

Important capabilities include:

- go to definition;
- find references;
- find implementation;
- type hierarchy;
- call hierarchy;
- symbol search;
- type information.

These signals are especially useful when changing public APIs, shared abstractions, strongly typed interfaces, or widely referenced symbols.

Where available, language-server or compiler-backed information should generally be preferred over an LLM guessing relationships from text.

---

## 10. AST and structural analysis

Abstract syntax trees and language-aware parsers can expose repository structure beyond plain text.

Possible uses include:

- function/class extraction;
- imports and exports;
- declaration relationships;
- dependency extraction;
- structured code chunking;
- syntax-aware indexing;
- architectural constraint checks.

Tools such as Tree-sitter can provide cross-language structural parsing when native compiler APIs are unavailable or impractical.

Structural indexing is particularly useful when a repository is too large for direct inspection but semantic similarity alone is insufficient.

---

## 11. Repository maps

A repository map is a compact representation of important files, symbols, and relationships intended to orient an agent before deeper inspection.

A repository map may contain:

```text
src/api/order.ts
  createOrder(...)
  cancelOrder(...)
      |
      +--> OrderService

src/services/order-service.ts
  OrderService
      |
      +--> OrderRepository
      +--> PaymentGateway

src/repositories/order-repository.ts
  OrderRepository
```

Repo maps can be generated using symbol extraction and graph ranking techniques or produced from existing build/dependency metadata.

### Benefits

- compact orientation;
- reduced blind browsing;
- structural awareness;
- useful context under tight token budgets.

### Risks

- stale relationships;
- centrality rankings that emphasize infrastructure rather than task relevance;
- parser gaps;
- preprocessing cost;
- false confidence in incomplete maps.

### the platform position

Repository maps are a useful technique, not a universal requirement.

They should be evaluated against simpler repository-search mechanisms for the target workload.

Related experiment: `EXP-CTX-006`.

---

## 12. Semantic repository retrieval

Semantic indexes are useful when task language and repository terminology differ.

Example:

> "Where do we prevent users from accessing another tenant's records?"

The relevant implementation may contain terms such as:

```text
organizationId
scopePredicate
resourceOwner
authorizationGuard
```

without containing the phrase "another tenant."

Semantic retrieval can bridge this vocabulary gap.

However, semantic similarity should not replace exact search, symbol navigation, or verification.

---

## 13. Agent-directed exploration

A capable coding agent can iteratively navigate a repository using tools:

```text
inspect structure
   ↓
search
   ↓
read candidate
   ↓
follow symbol/reference
   ↓
inspect tests
   ↓
inspect configuration
   ↓
form hypothesis
   ↓
verify
```

This resembles how a developer investigates unfamiliar code.

Agent-directed exploration has several advantages:

- naturally adapts to unusual repositories;
- requires less precomputation;
- follows clues dynamically;
- works even when indexes are incomplete.

But exploration also consumes model calls and context and can fail through poor search decisions.

Recent empirical work suggests that delegated deep-search workflows can underperform indexed semantic retrieval on some read-only repository question-answering workloads. This should caution against assuming that autonomous exploration is inherently superior to indexing.

the platform should therefore evaluate **indexed retrieval and agentic exploration as complementary mechanisms**.

---

## 14. Tests are repository intelligence

Tests reveal information that source code alone may not communicate clearly:

- intended behavior;
- edge cases;
- historical regressions;
- supported API contracts;
- fixture conventions;
- expected errors;
- environmental assumptions.

For many change tasks, finding the relevant tests should be part of repository context acquisition rather than merely verification after implementation.

A useful retrieval result often includes:

```text
implementation
+ callers
+ tests
+ configuration
+ documentation
```

rather than only the most semantically similar source file.

---

## 15. Git history as context

Git provides temporal repository intelligence.

Useful operations include:

- inspect recent changes to a file;
- blame a line or symbol;
- find the commit that introduced behavior;
- inspect prior implementations;
- understand why an unusual workaround exists.

History should be retrieved when the task requires historical reasoning rather than loaded routinely.

Commit messages are evidence, not automatically authoritative design documentation.

---

## 16. Ownership and organizational context

Repository ownership metadata may include:

- CODEOWNERS;
- maintainers;
- review rules;
- service ownership;
- architectural boundaries.

This information can help agents identify:

- where approval is required;
- which team owns a subsystem;
- whether a change crosses organizational boundaries.

Ownership metadata should inform workflow and authority, not merely code generation.

---

## 17. Runtime and operational signals

Some repository questions cannot be answered correctly from static code alone.

Useful signals may include:

- build failures;
- test failures;
- logs;
- traces;
- deployment configuration;
- feature flags;
- generated schemas;
- runtime environment variables;
- dependency versions.

The agent should distinguish repository state from runtime state.

A source file may describe one behavior while deployment configuration activates another.

---

## 18. Generated code and artifacts

Generated content can badly pollute repository retrieval.

Examples include:

- transpiled output;
- generated clients;
- lockfile internals;
- coverage reports;
- vendored dependencies;
- snapshots;
- build artifacts;
- generated schemas.

These files should often be excluded or downweighted during discovery.

However, exclusion must not be absolute. Generated artifacts may become relevant when debugging generation pipelines, packaging, or deployment.

The correct rule is contextual filtering rather than permanent blindness.

---

## 19. Context packs

For complex changes, repository discovery may produce a bounded **context pack**.

Example:

```text
Task: change order cancellation behavior

Relevant implementation:
- src/services/order-service.ts

Callers:
- src/api/order.ts
- src/jobs/order-timeout.ts

Tests:
- test/order-service.spec.ts

Configuration:
- config/order-policy.ts

Related decision:
- docs/adr/014-order-state-machine.md
```

The context pack should be a retrieval result, not a permanent repository description.

It should preserve citations or file paths so the agent can reopen authoritative sources when needed.

---

## 20. Suggested repository discovery pipeline

A general-purpose coding-agent flow should look approximately like:

```text
1. Inspect repository shape
       ↓
2. Detect existing tooling and language ecosystem
       ↓
3. Identify exact clues from task
       ↓
4. Run cheap lexical/file/symbol discovery
       ↓
5. Add semantic/structural retrieval if needed
       ↓
6. Inspect relevant implementation
       ↓
7. Follow references/dependencies
       ↓
8. Inspect tests and constraints
       ↓
9. Build bounded working context
       ↓
10. Implement
       ↓
11. Verify using repository-native tooling
```

This sequence is intentionally adaptive.

Steps may be skipped when unnecessary.

---

## 21. Tool-specific adapters

the platform should define abstract repository capabilities before defining vendor-specific implementations.

Example capabilities:

```text
repository.listFiles()
repository.searchText()
repository.findSymbol()
repository.findReferences()
repository.getDependencies()
repository.getBuildTargets()
repository.getTests()
repository.getDiff()
repository.getHistory()
```

Adapters may then implement those capabilities through the environment already present.

Examples:

```text
Nx              -> project/dependency/build graph
pnpm workspaces -> package relationships
Turborepo       -> task relationships
Bazel           -> target/build graph
TypeScript      -> type/symbol graph
LSP             -> definitions/references
Git             -> history/diff/ownership evidence
filesystem      -> universal fallback
```

This keeps handbook guidance portable while still allowing deep integration with capable tooling.

---

## 22. Repository instructions versus repository intelligence

Repository instructions answer:

> How should work be performed here?

Repository intelligence answers:

> What exists here, and how is it connected?

These are different forms of context.

For example:

```text
AGENTS.md:
  Run integration tests before modifying API contracts.

Repository intelligence:
  API contracts live in packages/contracts.
  The relevant integration suite is test/api-contracts.
```

Instructions should not become a manually maintained duplicate of discoverable repository structure.

---

## 23. Failure modes

### 23.1 Whole-repository ingestion

Loading large portions of a repository because context capacity permits it.

**Risk:** noise, cost, stale reasoning, lost attention.

### 23.2 Tool-driven architecture distortion

Changing repository architecture primarily to make agent tooling easier.

**Risk:** unnecessary infrastructure and long-term maintenance burden.

### 23.3 Stale index confidence

Treating precomputed indexes as authoritative after repository changes.

**Risk:** missed files and incorrect relationships.

### 23.4 Semantic-only search

Using embeddings for identifiers and exact technical strings.

**Risk:** weak recall for precise code clues.

### 23.5 Grep-only exploration

Treating string matches as sufficient understanding.

**Risk:** missing indirect semantic or structural relationships.

### 23.6 Ignoring tests during discovery

Reading implementation but not behavior specifications encoded in tests.

### 23.7 Ignoring generated-content noise

Allowing dependency folders or generated output to dominate search results.

### 23.8 Framework assumption leakage

Assuming a repository uses, or should use, familiar the platform tooling.

Examples:

- assuming Nx in a non-Nx repository;
- assuming React for all frontends;
- assuming Kubernetes for deployment;
- assuming GraphQL for APIs.

This is explicitly prohibited by AEP-P-016.

---

## 24. Initial platform guidance

### AEP-CTX-010-G1 — Inspect before prescribing

Repository tooling should be discovered before architecture recommendations are made.

**Status:** Approved

### AEP-CTX-010-G2 — Use multiple repository signals

Code intelligence should combine exact, structural, semantic, behavioral, and historical signals as appropriate to the task.

**Status:** Recommended

### AEP-CTX-010-G3 — Prefer authoritative live state for volatile facts

Use live filesystem, compiler, test, diff, and repository-native metadata where practical.

**Status:** Recommended

### AEP-CTX-010-G4 — Treat indexes as acceleration structures

Precomputed indexes and maps accelerate discovery but should not silently become authoritative replacements for the current repository.

**Status:** Recommended

### AEP-CTX-010-G5 — Tests belong in context acquisition

For behavior-changing work, relevant tests should usually be identified before implementation rather than only after it.

**Status:** Recommended

### AEP-CTX-010-G6 — Repository maps are optional

Use repository maps when they measurably improve orientation or context efficiency.

**Status:** Provisional

### AEP-CTX-010-G7 — Adapt strategy to repository scale and workload

Small repositories may require little or no indexing; large repositories may justify specialized indexes and graph representations.

**Status:** Recommended

---

## 25. Experiments

### Existing

**EXP-CTX-006 — Repository-map effectiveness**

Determine when compact structural maps improve repository navigation and downstream coding performance.

### New

**EXP-CTX-027 — Live Exploration vs Precomputed Repository Index**

Compare live lexical/symbol exploration, precomputed semantic retrieval, and combinations of both across repository sizes and task classes.

Primary measures:

- task success;
- relevant-file recall;
- tool calls;
- context tokens;
- latency;
- cost;
- stale-context failures.

**EXP-CTX-028 — Repository Context Pack Composition**

Determine which context-pack composition best supports code changes:

- implementation only;
- implementation + callers;
- implementation + tests;
- implementation + callers + tests + configuration;
- adaptive composition.

Measure downstream patch correctness rather than retrieval quality alone.

---

## 26. Open questions

1. At what repository size does semantic indexing begin to outperform direct agent exploration economically?
2. When do repository maps outperform lexical + semantic retrieval?
3. Which symbol relationships provide the highest downstream value?
4. How frequently must indexes refresh during active editing?
5. Should agents receive dependency graphs proactively or retrieve relevant graph slices on demand?
6. How should generated files be filtered without hiding generation-related defects?
7. How strongly does inclusion of relevant tests improve first-pass implementation success?
8. Can repository-native build graphs provide enough structure to avoid custom indexing in many projects?
9. How should multi-language repositories unify symbol and dependency intelligence?
10. Which repository metrics predict when specialized context infrastructure is worth maintaining?

---

## 27. External evidence and references

### Visual Studio Code — How Copilot understands your workspace

Current documentation describes coding agents combining semantic search, text search, grep, file search, symbol usages, directory listing, and direct file reading. It also notes that small repositories may be read more directly while larger repositories require selective search, and recommends excluding generated/noisy paths to reduce irrelevant context.

https://code.visualstudio.com/docs/agents/reference/workspace-context

### Deep Agentic Search for Repository-Level Code Question Answering (2026)

The SWE-QA study compared indexed semantic search with delegated deep agentic search for repository-level question answering. On its evaluated workload, semantic search achieved higher answer accuracy and lower cost, while delegated search introduced substantial handoff failures. The result should not be generalized to every coding task, but it provides evidence against assuming agentic exploration always dominates indexing.

https://arxiv.org/abs/2608.01507

### Agent Patterns Catalog — Repo Map

Documents the repository-map pattern using symbol/dependency structure and highlights both the orientation benefits and risks from stale or mis-ranked structural maps.

https://agentpatternscatalog.github.io/patterns/patterns/repo-map-context.html

### OpenAI — Rethinking skills and prompts for GPT-6 Astra

Reinforces the broader context-engineering principle that scaffolding and repository instructions should be periodically simplified as model capability improves rather than accumulating indefinitely.

https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra

---

## 28. Conclusion

Repository context should be constructed from the repository that actually exists.

the platform should not standardize on a monorepo framework, vector database, repository map, semantic index, or code graph simply because those tools are useful in some environments.

Instead, coding agents should begin by observing:

```text
What is this repository?
What structure already exists?
What information does this task require?
What is the cheapest reliable way to obtain it?
```

The resulting architecture may be extremely simple for a small project and sophisticated for a large enterprise codebase.

Both can be correct.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-context.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-CTX-003 — Retrieval Architecture](AEP-CTX-003-retrieval-architecture.md)
- [AEP-CTX-005 — Lexical and Hybrid Retrieval](AEP-CTX-005-lexical-and-hybrid-retrieval.md)
- [AEP-CTX-007 — Progressive Disclosure](AEP-CTX-007-progressive-disclosure.md)
- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
