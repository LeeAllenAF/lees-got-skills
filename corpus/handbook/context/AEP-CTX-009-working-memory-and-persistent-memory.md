---
schema_version: '1.0'
id: AEP-CTX-009
title: Working Memory and Persistent Memory
summary: 'Working Memory and Persistent Memory. Focus: memory, provenance, retention.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- context-engineering
tags:
- memory
- provenance
- retention
scope:
- enterprise-global
- software-development-agents
related:
- AEP-CTX-001
- AEP-CTX-002
- AEP-CTX-007
- AEP-CTX-008
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 120d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/context/AEP-CTX-009-working-memory-and-persistent-memory.md
  original_sha256: 70fc8be18f5614b2ab303b50199921bc42fab28a20b5be8c646e31de7558e14e
  original_metadata_record: handbook/context/AEP-CTX-009-working-memory-and-persistent-memory.md
  authority: inherited-source-context
---

# AEP-CTX-009 — Working Memory and Persistent Memory

## 1. Summary

Agent memory should not be treated as a single undifferentiated store.

the platform currently recommends a layered memory architecture that separates:

1. **active context** — what the model can currently see;
2. **working memory** — explicit state needed to continue the current task;
3. **episodic memory** — recoverable records of what happened and when;
4. **semantic memory** — durable facts and knowledge derived from trusted evidence;
5. **procedural memory** — reusable knowledge about how work should be performed;
6. **source-of-truth artifacts** — authoritative external state such as repositories, tickets, documents, databases, and configuration.

These layers should not have identical write policies, retention rules, or trust semantics.

The central principle is:

> **Agents may observe freely within their authority, but durable organizational knowledge should be promoted deliberately.**

Memory architecture should preserve provenance, scope, freshness, contradiction history, and the ability to recover original evidence.

## 2. Memory Is Not the Context Window

A long-running agent session can contain more useful state than will fit in one model invocation.

Current production agent systems increasingly separate the durable session from the model's immediate context. Anthropic's Managed Agents architecture explicitly describes a session as broader than the context window and warns that irreversible compaction can lose information needed by future turns. Their long-running-agent guidance similarly relies on external artifacts and persistent state to bridge context boundaries.

This distinction yields a useful model:

```text
                 Agent memory system
                        │
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
  Durable history   Structured state   Knowledge stores
        │               │                │
        └───────────────┼────────────────┘
                        ▼
                 retrieval / selection
                        │
                        ▼
                   active context
```

The model should not need every remembered item in active context at once.

## 3. Memory Classes

### 3.1 Active context

The tokens currently visible to the model.

Examples:

- governing instructions;
- current task;
- selected repository files;
- retrieved guidance;
- recent tool results;
- current plan;
- compacted state.

Active context is temporary and expensive. It is not itself durable memory.

### 3.2 Working memory

Explicit mutable state required to continue an ongoing task.

Examples:

```yaml
objective: Add refreshable IAM database authentication
phase: implementation
changed_files:
  - src/db/auth.ts
  - src/db/client.ts
open_failures:
  - integration test still uses static password fixture
decisions:
  - refresh credentials before opening a new connection
remaining:
  - update fixture
  - run lint
  - run typecheck
  - run integration tests
```

Working memory should be concise, structured where possible, and scoped to a task or workflow.

It normally expires when the task ends unless selected information is promoted elsewhere.

### 3.3 Episodic memory

A record of events or experiences.

Examples:

- what actions were attempted;
- what failed;
- which tool produced a result;
- when a decision changed;
- what deployment occurred;
- what a reviewer requested;
- which experiment configuration produced a result.

Episodic memory answers questions such as:

> What happened?

> In what order?

> What did we know at that point?

It is especially useful for debugging, recovery, auditability, and longitudinal learning.

### 3.4 Semantic memory

Durable knowledge intended to remain useful beyond one episode.

Examples:

- a repository uses Node.js 22;
- a service exposes a GraphQL Federation subgraph;
- a project requires a specific security control;
- an the platform experiment found that a retrieval configuration outperformed another under defined conditions.

Semantic memory answers:

> What is currently believed to be true?

Because it can influence future tasks, semantic memory requires stronger provenance and update rules than working memory.

### 3.5 Procedural memory

Reusable knowledge about how to perform work.

Examples:

- how to release an npm package;
- how to execute a database migration;
- how to review a GraphQL schema change;
- how to debug a failed deployment;
- how to conduct an the platform retrieval evaluation.

Procedural memory should usually be represented as explicit skills, playbooks, scripts, templates, or standards rather than opaque learned behavior.

This makes it inspectable, versionable, testable, and portable across models.

## 4. Memory Is Different From Source of Truth

Agents should not copy durable facts into memory when a stronger authoritative source already exists and can be queried cheaply.

For example:

```text
Weak design:
Memory says "package version is 4.2.1"

Preferred design:
Read package.json when the current version is needed
```

Likewise:

```text
Weak design:
Remember the current database schema indefinitely

Preferred design:
Use schema inspection + remember only durable architectural facts
```

Memory should reduce unnecessary rediscovery, not compete with authoritative state.

A useful ordering is:

```text
authoritative live source
        >
versioned organization/scope/repository knowledge
        >
promoted semantic memory
        >
episodic recollection
        >
model inference
```

This is not an instruction-authority hierarchy; it is a **factual reliability heuristic** and must still account for freshness and provenance.

## 5. Memory Promotion

Not everything an agent observes should become durable memory.

the platform should use an explicit promotion lifecycle:

```text
observation
   ↓
working state
   ↓
validated candidate memory
   ↓
semantic / procedural promotion
   ↓
review / expiry / supersession
```

### Automatically retainable state

Systems may usually persist low-risk execution state automatically when scoped to the current task or session.

Examples:

- completed subtasks;
- open test failures;
- artifact identifiers;
- tool-call results needed for continuation;
- checkpoints;
- implementation progress.

### Candidate memory

Potentially reusable information can be stored as a candidate rather than immediately treated as truth.

Example:

```yaml
claim: "This repository uses pnpm for package management."
status: candidate
source:
  type: repository-file
  path: package.json
observed_at: 2026-09-30
confidence: high
```

A later validation or deterministic extraction process can promote it.

### Durable semantic knowledge

Promotion should require stronger evidence when the memory will affect future decisions.

High-value durable knowledge should normally include:

- source;
- timestamp;
- scope;
- confidence or status;
- validation method;
- expiry/review rule when appropriate.

## 6. What Should Not Be Learned Automatically

An agent should not silently convert the following into durable organizational truth:

- guesses;
- inferred user preferences from one interaction;
- generated code explanations not verified against the repository;
- untrusted retrieved content;
- failed hypotheses;
- outdated environment observations;
- model self-assessments;
- unsupported architectural conclusions;
- temporary task constraints;
- scope-specific information outside the permitted scope.

The danger is not merely incorrect memory. It is **incorrect memory that later appears authoritative because its origin has been forgotten**.

## 7. Provenance-Aware Memory

Every durable memory item should answer:

```text
What is this?
Where did it come from?
When was it observed?
Who or what created it?
What scope does it apply to?
How was it validated?
What evidence supports it?
When should it be rechecked?
What supersedes it?
```

A conceptual record might look like:

```yaml
id: MEM-REPO-00421
type: semantic
scope:
  organization: project-a
  repository: customer-platform
claim: "Production deployments require approval from the release workflow."
source:
  kind: repository
  path: .github/workflows/release.yml
  revision: 81ac19b
observed_at: 2026-09-30T18:00:00Z
validation:
  method: deterministic-extraction
status: active
review_after: 2026-12-30
```

This is substantially safer than an unstructured vector-memory entry such as:

> Project A requires approval for production.

## 8. Scope Is Mandatory

Memory without scope becomes contamination.

At minimum, a memory system may need to distinguish:

```text
public/general
the enterprise
client
project
repository
branch/environment
task/session
user
```

A repository convention learned from Project A must not appear in Project B's context.

A temporary feature-branch fact should not become repository-wide truth.

A development-environment workaround should not silently become a production standard.

## 9. Temporal Semantics and Freshness

Many memories decay.

Examples:

- dependency versions;
- API behavior;
- model capabilities;
- pricing;
- infrastructure topology;
- team ownership;
- deployment procedures.

Memory records should therefore support temporal properties such as:

```yaml
observed_at: 2026-09-30
valid_from: 2026-09-30
valid_until: null
review_after: 2026-12-30
superseded_by: null
```

Retrieval should consider freshness as part of relevance.

A semantically perfect result that is two years stale may be worse than a slightly less similar current result.

## 10. Contradiction Is Normal

Persistent systems will eventually encounter conflicting information.

A memory architecture should preserve contradiction rather than overwrite history silently.

Example:

```text
2026-01: Node 20 required
2026-08: Node 22 required
```

The correct representation is not necessarily deletion of the first observation. It may be:

```text
old fact → superseded
new fact → active
```

This allows the system to answer both:

> What is required now?

and

> Why did this historical build use Node 20?

## 11. Retention and Forgetting

A memory system requires deletion and expiry semantics, not just insertion.

Possible retention policies include:

### Task-scoped

Delete or archive after task completion.

### Session-scoped

Retain only for the active agent session.

### Time-limited

Expire after a defined interval unless refreshed.

### Source-bound

Remain valid while a source revision or external record remains authoritative.

### Reviewed durable

Persist indefinitely but undergo periodic validation.

### Event-sourced

Retain immutable history while separately maintaining current effective state.

the platform should avoid indefinite retention by default where no continuing value exists.

## 12. Memory Retrieval

A large memory store still requires context engineering.

Possible retrieval signals include:

- semantic similarity;
- lexical match;
- entity match;
- repository/project scope;
- recency;
- authority;
- source type;
- task type;
- prior usefulness;
- temporal validity.

Memory retrieval should generally produce a small evidence set rather than dumping all related history into context.

A useful conceptual ranking model is:

```text
relevance
× scope match
× freshness
× source reliability
× task applicability
```

The exact implementation should be empirical rather than assumed.

## 13. Episodic vs Semantic Retrieval

These answer different questions.

Semantic memory:

> What do we currently know about this repository?

Episodic memory:

> What happened the last three times this deployment failed?

Collapsing both into the same flat vector store can make temporal and causal reasoning harder.

Recent research on long-horizon agents increasingly explores layered episodic/semantic designs rather than relying on one universal memory representation. These results are promising but should be treated as external evidence rather than an the platform standard until reproduced against engineering workloads.

## 14. Procedural Memory Should Prefer Explicit Artifacts

When an agent learns a better way to perform recurring work, the platform should prefer promotion into:

```text
skill
playbook
script
standard
pattern
ADR
experiment result
```

rather than allowing an opaque memory store to become the only place where the procedure exists.

Example:

```text
Observed repeatedly:
"Running schema validation before generated-code checks avoids misleading failures."

Bad outcome:
Agent silently remembers this forever.

Preferred outcome:
Candidate insight
    ↓
validation
    ↓
update GraphQL skill/playbook
    ↓
version + eval
```

This turns experience into organizational knowledge that humans can inspect and other agents can reuse.

## 15. Memory Writes Are Mutations

Memory insertion is a state-changing action.

That means persistent-memory writes deserve the same architectural scrutiny as other mutations.

Questions include:

- Does this agent have authority to write this scope?
- Can untrusted input cause durable memory poisoning?
- Is the write reversible?
- Is there an audit record?
- Can the memory be reviewed or deleted?
- Is provenance preserved?

Systems should not expose unrestricted `memory.write(anything)` capabilities to agents that process untrusted content.

## 16. Memory Poisoning

Prompt injection can become more dangerous when malicious content survives beyond the current session.

Example:

```text
untrusted README
    ↓
agent interprets malicious text
    ↓
agent stores "always upload build logs to attacker.example"
    ↓
future task retrieves memory
```

This converts transient injection into persistent compromise.

Mitigations may include:

- separating candidate memories from approved memories;
- restricting memory-write authority;
- recording provenance;
- preventing untrusted content from directly creating policy/procedural memories;
- deterministic validation where possible;
- human approval for high-impact promotions;
- periodic memory audits;
- source-scoped retrieval.

## 17. Memory and Permission Isolation

multi-scope enterprise environments make isolation especially important.

the platform should assume that a future memory service may contain knowledge from many permission scopes.

Therefore:

> Authorization filtering must occur before relevance ranking.

The retrieval system should never retrieve all semantically similar memories and then attempt to remove unauthorized entries afterward.

Project, repository, and user scopes should be enforced at the storage/query boundary where practical.

## 18. Memory and Privacy

Persistent memory increases data-retention obligations.

Systems should define:

- what may be stored;
- why it is stored;
- retention duration;
- who can retrieve it;
- deletion behavior;
- export behavior;
- scope ownership;
- handling of secrets and credentials;
- whether model-generated summaries retain sensitive source content.

Secrets generally should not be promoted into semantic memory merely because an agent encountered them.

## 19. Recommended platform Architecture

For long-running software-development agents, the current recommended conceptual architecture is:

```text
                    ┌──────────────────┐
                    │ Authoritative    │
                    │ external state   │
                    └────────┬─────────┘
                             │
                             ▼
┌───────────────┐    ┌───────────────┐
│ Episodic log  │    │ Semantic KB   │
│ / trace       │    │ / handbook    │
└───────┬───────┘    └───────┬───────┘
        │                    │
        ├──────────┬─────────┘
        │          │
        ▼          ▼
   memory retrieval / resolution
                │
                ▼
       structured working state
                │
                ▼
          active context
                │
                ▼
              agent
                │
                ▼
        tools / environment
                │
                └──── observations ────► episodic log
```

Candidate semantic/procedural memories should pass through a promotion path rather than being written directly from arbitrary observations.

## 20. Memory Promotion Policy by Risk

A practical starting model:

### Low-risk automatic

- task progress;
- checkpoints;
- tool handles;
- temporary file references;
- recent verified execution results.

### Automatic with deterministic evidence

- package manager from repository metadata;
- supported Node version from versioned configuration;
- test command from package scripts;
- repository project names from Nx configuration.

### Review or stronger validation recommended

- inferred architectural intent;
- project business rules;
- cross-repository conventions;
- new procedural guidance;
- conclusions derived from several inconsistent sources.

### Human approval expected

- organizational policy;
- security policy;
- permissions/authority changes;
- scope-specific normative standards;
- durable knowledge derived primarily from untrusted external content.

## 21. Memory Quality Metrics

Memory systems should be evaluated on more than retrieval recall.

Useful metrics include:

### Accuracy

Is the retrieved memory correct?

### Provenance fidelity

Can the memory be traced to its evidence?

### Freshness

Does retrieval favor currently valid knowledge?

### Scope precision

Does memory remain within the correct scope/repository/task boundary?

### Contradiction handling

Does the system identify superseded or conflicting memories correctly?

### False-memory rate

How often does generated or inferred information become incorrectly stored as fact?

### Retrieval usefulness

Does the memory improve downstream task success?

### Token efficiency

How much active context is consumed per useful memory retrieval?

### Write precision

How many stored memories were actually worth retaining?

### Deletion correctness

Can expired or requested-for-removal information be reliably excluded?

## 22. Proposed Experiments

### EXP-CTX-024 — Automatic vs Gated Memory Promotion

**Question:** Does requiring evidence-based promotion materially reduce false or stale durable memories without creating unacceptable maintenance overhead?

Compare:

```text
automatic write of inferred durable facts
vs
candidate → validate → promote
```

Measure:

- false-memory rate;
- stale-memory rate;
- retrieval usefulness;
- human intervention;
- latency and cost.

### EXP-CTX-025 — Flat Memory Store vs Layered Episodic/Semantic Memory

**Question:** Does separating episodic history from semantic knowledge improve long-horizon engineering tasks?

Evaluate tasks requiring:

- historical failure recall;
- current-state questions;
- temporal reasoning;
- repository fact retrieval;
- contradiction handling.

### EXP-CTX-026 — Freshness- and Scope-Aware Memory Ranking

**Question:** Does explicitly incorporating temporal validity and scope into ranking reduce stale or cross-scope retrieval without harming useful recall?

Compare:

```text
semantic similarity only
vs
semantic + metadata filters
vs
semantic + scope + freshness-aware ranking
```

## 23. Initial the platform Guidance

### Recommended

- Separate active context, working state, episodic memory, semantic memory, and procedural knowledge.
- Preserve durable history outside the model context for recoverability.
- Prefer authoritative live sources over copied memories when inexpensive to query.
- Use structured working state for ongoing tasks.
- Preserve provenance for durable memory.
- Scope all persistent memory.
- Represent temporal validity and supersession where facts can change.
- Treat memory writes as privileged mutations.
- Separate candidate memories from approved organizational knowledge.
- Prefer explicit skills/playbooks/standards for durable procedural knowledge.
- Enforce authorization before memory retrieval/ranking.

### Provisional

- Use layered episodic + semantic stores for complex long-running agents.
- Include freshness directly in memory ranking.
- Automate promotion when claims can be validated deterministically.

### Not currently recommended

- A single unscoped vector database as the entire memory system.
- Automatically treating model-generated summaries as durable fact.
- Permanent retention of every interaction.
- Allowing untrusted content to write persistent procedural instructions.
- Using memory as a substitute for querying authoritative live state.
- Silent overwrite of contradictory historical facts.

## 24. Relationship to the the platform Handbook

The handbook itself is a form of curated semantic and procedural organizational memory.

This makes it intentionally different from an autonomous memory store.

Handbook knowledge is:

- versioned;
- reviewed;
- typed;
- evidence-linked;
- explicitly scoped;
- promoted deliberately.

A future the platform memory service should be capable of surfacing candidate insights from operational experience, but the path should be:

```text
agent experience
    ↓
candidate insight
    ↓
evidence / experiment / review
    ↓
handbook or skill update
```

not:

```text
agent once believed something
    ↓
enterprise standard
```

## 25. References and Current Evidence

### Anthropic — Scaling Managed Agents: Decoupling the brain from the hands (2026)

Describes the session as broader than the model context window and discusses recoverable externalized context, compaction, trimming, and memory.

https://www.anthropic.com/engineering/managed-agents

### Anthropic — Effective harnesses for long-running agents (2025)

Demonstrates long-running coding workflows that rely on explicit artifacts, incremental progress, testing, and cross-session state rather than transcript continuity alone.

https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

### Anthropic — Effective Context Engineering for AI Agents (2026 event material)

Describes compaction, structured memory, and sub-agent architectures as major context-management techniques for long-horizon agents.

https://www.anthropic.com/events/anthropic-at-aws-summit-la-2026

### Milosevic — Episodic-Semantic Memory Architecture for Long-Horizon Scientific Agents (2026)

Evaluates a dual-process episodic/semantic design across long-running scientific-agent workloads and reports different strengths for consolidated memory and retrieval-based history access.

https://arxiv.org/abs/2605.17625

### Tiwari & Fofadiya — Multi-Layered Memory Architectures for LLM Agents (2026)

Evaluates working, episodic, and semantic layers with adaptive retrieval and reports improvements in retention and reduced false-memory behavior on long-context benchmarks.

https://arxiv.org/abs/2603.29194

### Wu & Zhu — Agent Zero Memory (2026)

Recent research on provenance-aware multi-representation memory combining episodic events, graph structure, and documentary semantic memory. Useful evidence for provenance and layered-memory design, but not yet an the platform-validated architecture.

https://arxiv.org/abs/2608.29606

## 26. Conclusion

Memory is valuable when it reduces repeated discovery and preserves continuity. It becomes dangerous when transient observations silently turn into durable truth.

the platform should therefore treat memory as a governed information system:

> **remember execution state freely within scope; promote durable knowledge deliberately; preserve provenance; prefer authoritative sources; and make forgetting a first-class operation.**

The objective is not to make an agent remember everything.

The objective is to make the right information recoverable, trustworthy, current, and available when needed.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-context.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-CTX-001 — Context Engineering Fundamentals](AEP-CTX-001-context-engineering-fundamentals.md)
- [AEP-CTX-002 — Context Sources and Instruction Hierarchy](AEP-CTX-002-context-sources-and-instruction-hierarchy.md)
- [AEP-CTX-007 — Progressive Disclosure](AEP-CTX-007-progressive-disclosure.md)
- [AEP-CTX-008 — Context Compression and Compaction](AEP-CTX-008-context-compression-and-compaction.md)
- [HARNESS-FOUNDATIONS-03-CONTEXT-AND-STATE — Context engineering, retrieval, memory, and durable state](../../harness/foundations/03-context-and-state.md)
