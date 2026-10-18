---
schema_version: '1.0'
id: AEP-CTX-011
title: Context Caching
summary: 'Context Caching. Focus: cache invalidation, prompt caching.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- context-engineering
tags:
- cache-invalidation
- prompt-caching
scope:
- enterprise-global
related:
- AEP-CTX-001
- AEP-CTX-007
- AEP-CTX-008
- AEP-CTX-009
- AEP-P-001
- AEP-P-003
- AEP-P-009
- AEP-P-015
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/context/AEP-CTX-011-context-caching.md
  original_sha256: e688e163be15e416c25bed84687a99952cd86c6f370a5e570c3824d1a2285f40
  original_metadata_record: handbook/context/AEP-CTX-011-context-caching.md
  authority: inherited-source-context
---

# AEP-CTX-011 — Context Caching

## 1. Purpose

Agent systems often resend substantial portions of the same context across repeated model calls: system instructions, tool definitions, repository guidance, shared reference material, conversation history, or large source artifacts. Provider-side context caching can reduce the cost and latency of repeatedly processing those inputs.

Caching changes the economics of context, but it does **not** change the semantics of context.

A cached token still occupies model context. Irrelevant cached material can still distract the model, compete with task-relevant evidence, increase effective context complexity, and complicate invalidation.

the platform therefore treats context caching as a **performance optimization layered on top of good context engineering**, not as a substitute for selective context construction.

The primary objective is:

> **Reuse stable, relevant context economically without allowing cache behavior to determine what the model should know.**

---

## 2. Caching and context quality are separate concerns

Two questions must be answered independently:

1. **Should this information be in active context?**
2. **If it is in active context repeatedly, can processing it be reused?**

The first is a context-engineering decision.

The second is a caching decision.

A useful rule is:

> **Relevance decides inclusion. Reuse decides caching.**

This prevents an attractive cache-hit rate from becoming a reason to preserve unnecessary context.

Bad reasoning:

```text
This 20K-token policy/reference block is cheap because it is cached,
therefore we should keep sending it.
```

Better reasoning:

```text
The agent needs 3K tokens from that material for this class of task.
Those 3K tokens are stable across many calls, so make that portion cache-friendly.
```

---

## 3. What context caching usually means

Modern provider-side prompt/context caching generally avoids recomputing model state for repeated input prefixes or explicitly cached content.

The exact implementation, billing model, minimum size, retention period, and API controls vary by provider and model.

As of this baseline:

- OpenAI supports prompt-prefix caching on supported models, including explicit cache breakpoints on GPT-5.6-and-later model families; reuse depends on matching rendered prefixes and model/runtime settings.
- Google Gemini supports implicit prefix caching on current model families and explicit cached-content objects in APIs that expose them.
- Other model providers expose related mechanisms with different semantics, TTLs, pricing, and placement rules.

the platform should therefore model caching conceptually and isolate provider-specific behavior in adapters.

---

## 4. Cacheable context classes

Candidate reusable context commonly includes:

```text
stable provider/application instructions
          |
organization standards
          |
repository bootstrap guidance
          |
stable tool definitions
          |
shared reference material
          |
conversation/session history
          |
large immutable artifacts
```

Not all of these should be cached in the same way.

### 4.1 Stable instructions

Examples:

- enduring application behavior;
- stable safety policy;
- stable formatting contracts;
- organization-wide agent principles.

These are natural cache-prefix candidates when they are genuinely needed by most calls.

### 4.2 Tool definitions

Tool schemas can consume significant context in agent systems with broad capabilities.

If the same tools remain exposed across repeated calls, stable tool definitions can benefit from caching.

However, AEP-CTX-007 still applies: a large tool catalog should not remain permanently active solely for caching convenience.

Dynamic tool discovery may reduce total context enough to outperform a highly cacheable but unnecessarily large catalog.

### 4.3 Shared reference material

Large stable references may be cacheable when many requests repeatedly require the same material.

Examples might include:

- a specification under active implementation;
- a stable API contract;
- a long source document being repeatedly analyzed.

For broad knowledge bases, retrieval is usually a better default than caching the entire corpus into active context.

### 4.4 Session history

Append-only conversations can produce naturally reusable prefixes.

This can make long sessions cheaper when earlier turns remain unchanged.

Compaction, rewriting, or replacing history can reduce cache reuse even when it improves overall context quality. These effects should be evaluated together rather than optimizing one metric in isolation.

---

## 5. Stable-prefix design

Prefix-oriented caches reward stable ordering.

A generic context layout might be:

```text
[ stable governing instructions ]
[ stable tool definitions       ]
[ stable shared references      ]
---------------- cache boundary --
[ scope/repository dynamic     ]
[ retrieved task context        ]
[ current task/request          ]
[ recent tool outputs           ]
```

This is a useful starting model, not a universal prescription.

The correct layout depends on:

- provider semantics;
- model family;
- whether tools are dynamically loaded;
- whether conversation history is append-only;
- whether shared references are actually relevant;
- privacy and isolation requirements;
- expected reuse frequency.

---

## 6. Stability is an architectural property

Cache effectiveness is strongly affected by apparently minor changes to early context.

Examples include:

- timestamps inserted near the beginning of a prompt;
- nondeterministic ordering of tool definitions;
- dynamically generated identifiers;
- scope-specific content mixed into otherwise shared instructions;
- rewritten conversation history;
- changing output schemas;
- changed model configuration that modifies rendered instructions.

Therefore:

> **Stable context should be structurally separated from volatile context.**

This improves not only caching but also reproducibility and debugging.

The application should avoid generating semantically identical but textually unstable prefixes when a stable representation is possible.

---

## 7. Do not optimize for cache-hit percentage alone

A high cache-hit rate is not itself a success metric.

Consider two systems:

```text
System A
40K active input tokens
90% cached

System B
8K active input tokens
60% cached
```

System A may have the better cache-hit percentage while still costing more, processing more irrelevant information, and performing worse.

Relevant metrics include:

- uncached input tokens;
- cached input tokens;
- cache-write tokens or storage cost;
- total effective input cost;
- time to first token;
- end-to-end latency;
- task success;
- context utilization;
- cache invalidation frequency;
- cache churn;
- cross-session reuse;
- retrieval/tool-call changes caused by caching decisions.

the platform guidance:

> Optimize end-to-end task economics and quality, not cache-hit rate in isolation.

---

## 8. Cache-write economics matter

Caching is not universally free.

Some providers charge for creating or storing cache entries while discounting subsequent reads. Others provide implicit caching under model-specific pricing.

A cache is economically useful only when reuse is likely enough to amortize creation/storage cost.

A conceptual break-even model is:

```text
cache benefit = repeated uncached processing avoided
                - cache write/storage cost
                - complexity/invalidation cost
```

The exact formula is provider-specific.

Candidate cache regions should therefore be evaluated by:

- size;
- reuse frequency;
- expected lifetime;
- volatility;
- number of consumers;
- security scope;
- provider pricing.

Large one-shot prompts are usually poor explicit-cache candidates unless prewarming is required for latency.

---

## 9. Cache lifetime and workload shape

Cache usefulness depends heavily on request locality.

A stable prefix reused twenty times in ten minutes may be highly valuable.

The same prefix reused once per week may provide little benefit if provider cache retention is measured in minutes or hours.

Useful workload dimensions include:

```text
reuse frequency
reuse interval
prefix size
prefix volatility
parallel session count
model affinity
scope/workspace isolation
```

Caching should therefore be evaluated against realistic traffic rather than synthetic back-to-back calls alone.

---

## 10. Explicit vs implicit caching

Providers increasingly expose both implicit and explicit caching patterns.

### Implicit caching

Advantages:

- low implementation effort;
- automatic reuse when prefixes align;
- good baseline for append-only sessions.

Disadvantages:

- less control over write locations;
- potentially harder to predict economics;
- platform-specific matching behavior.

### Explicit caching

Advantages:

- deliberate cache boundaries;
- possible prewarming;
- clearer reuse intent;
- can avoid writing volatile suffixes.

Disadvantages:

- more application complexity;
- invalidation and lifecycle management;
- provider-specific APIs;
- risk of over-optimizing around one platform.

the platform guidance:

> Prefer implicit caching initially where it is automatically available. Introduce explicit caching when measurements show that predictable reuse, latency, or cost warrants the additional lifecycle complexity.

---

## 11. Caching and progressive disclosure

Caching and progressive disclosure solve different problems.

Progressive disclosure asks:

> What should be loaded now?

Caching asks:

> If we load it repeatedly, can we avoid recomputing it?

They should complement each other.

Example:

```text
Always active
  small governing policy

Discoverable
  skill catalog metadata

Loaded on demand
  selected skill instructions

Retrieved
  relevant references

Cached when reused
  stable portions of the above
```

A well-designed system may have **less total cached content** than a poorly designed system because it avoids repeatedly loading unnecessary information.

---

## 12. Caching and dynamic tool loading

Tool definitions are often part of the cacheable prompt prefix.

This creates a tension:

```text
stable full tool catalog
        -> potentially high cache reuse
        -> higher active-context footprint

selectively loaded tools
        -> lower active-context footprint
        -> changing suffix/catalog composition
```

Neither is universally better.

For a small stable toolset, keeping definitions fixed may be efficient.

For hundreds of tools, dynamic discovery can materially reduce context pressure even if it complicates prefix reuse.

The decision should be based on end-to-end performance.

This should eventually be evaluated jointly with EXP-CTX-020.

---

## 13. Caching and compaction

Compaction can invalidate part of a reusable conversation prefix.

That does not mean compaction is bad.

For example:

```text
Before compaction:
50K tokens
40K cached

After compaction:
12K tokens
0K cached initially
```

The post-compaction call may temporarily lose cache savings while still being much cheaper and cognitively cleaner overall.

Therefore:

> **Never retain bloated history solely to preserve a cache hit.**

Compaction and caching should be evaluated using total task cost and success across the entire workflow.

---

## 14. Caching and retrieval

Retrieval and caching can also complement each other.

Repeated tasks may retrieve the same stable documents.

Possible strategies include:

```text
retrieve every time
        |
retrieve + cache common selected context
        |
cache stable base + retrieve changing evidence
```

However, caching retrieved knowledge introduces freshness concerns.

If the underlying source can change, the application must understand what causes invalidation.

This is particularly important for:

- repository files;
- active API documentation;
- scoped policies;
- tickets/issues;
- database state;
- operational runbooks.

A cache must never silently become a stale source of truth.

---

## 15. Cache invalidation

Caching introduces a classic systems problem: deciding when reusable state is no longer valid.

Potential invalidation dimensions include:

- content version;
- repository commit SHA;
- policy version;
- scope/workspace identifier;
- tool-schema version;
- model family;
- output schema;
- security scope;
- user authorization;
- TTL.

Where application-controlled cache objects exist, cache identity should derive from stable versioned inputs rather than ad-hoc human labels.

Conceptually:

```text
cache identity = hash(
  model/version,
  policy version,
  tool schema version,
  knowledge version,
  authorization scope
)
```

Not every provider exposes cache identity this way, but internal systems should maintain enough metadata to determine why a cache entry is valid.

---

## 16. Authorization and tenant isolation

Cache reuse must never violate isolation boundaries.

Provider-managed caches typically provide organization/project-level isolation semantics, but the platform systems still need explicit application-level scope discipline.

Do not optimize shared cache reuse across permission scopes if doing so creates ambiguity about data ownership, authorization, billing, or side-channel exposure.

Useful cache scopes may include:

```text
organization
client
workspace
repository
user
session
```

The correct scope depends on the sensitivity and ownership of the content.

When in doubt, prefer narrower reuse over cross-boundary optimization.

---

## 17. Privacy and retention

Caching can have data-retention implications distinct from ordinary inference.

Provider behavior differs substantially:

- some caches are ephemeral in-memory state;
- some providers expose extended cache retention;
- explicit cached-content systems may persist content for a configured TTL;
- enterprise/ZDR rules may alter what is allowed.

Therefore:

> **Caching configuration is part of the data-governance architecture.**

Before enabling explicit or extended retention for scoped data, verify current provider documentation, contractual terms, organizational settings, and the sensitivity classification of the content.

Provider caching behavior is volatile guidance and should be reviewed frequently.

---

## 18. Prewarming

Some providers support preparing cache state before the actual interactive request.

Prewarming can reduce latency when:

- a large stable context is known in advance;
- first-token latency matters;
- reuse is highly likely soon afterward.

Examples might include:

- opening an IDE workspace and preparing shared repository guidance;
- beginning a scheduled large-document analysis session;
- initializing a frequently used specialized agent.

Prewarming should not be used merely to create speculative cache entries with low reuse probability.

---

## 19. Cache-aware context construction

A practical context builder should conceptually classify context along at least two independent axes:

```text
Relevance / necessity

required
useful
optional
irrelevant

        x

Stability / reuse

stable
semi-stable
volatile
one-shot
```

This produces better decisions than a single `cacheable: true/false` flag.

Example:

| Context item | Relevance | Stability | Likely treatment |
|---|---|---|---|
| Core safety policy | required | stable | active + cache-friendly |
| Repository language/version | required | semi-stable | active; versioned |
| Complete engineering handbook | low for most tasks | stable | retrieve selectively; do not preload |
| Current test failure | required | volatile | active, uncached suffix |
| Selected skill instructions | useful/required | stable | load on demand; cache if reused |
| Current git diff | required | volatile | active, refresh live |

---

## 20. Cache-aware layout should remain provider-portable

The handbook should describe stable architectural concepts such as:

- separate stable and volatile context;
- preserve useful append-only history where appropriate;
- maintain deterministic ordering;
- version cached content;
- measure reuse;
- isolate tenants;
- do not trade relevance for cacheability.

Provider adapters may then implement:

```text
OpenAI prefix breakpoints
Gemini implicit/explicit caching
other provider-specific cache objects
local KV-cache reuse
self-hosted inference prefix caching
```

The business logic should not assume that every model provider exposes the same cache semantics.

---

## 21. Failure modes

### 21.1 Cache-driven context bloat

**Failure:** Content remains active because it is inexpensive to cache.

**Consequence:** Lower context quality despite attractive billing metrics.

**Mitigation:** Apply relevance filtering before cache optimization.

### 21.2 Volatile prefixes

**Failure:** Timestamps, randomized ordering, dynamic IDs, or task-specific text appear before otherwise stable material.

**Consequence:** Poor cache reuse.

**Mitigation:** Separate stable and dynamic context structurally.

### 21.3 Cache-hit vanity metrics

**Failure:** Teams optimize hit percentage rather than total task economics.

**Consequence:** Local optimization can increase total cost or reduce quality.

**Mitigation:** Measure full workflow cost, latency, and success.

### 21.4 Stale cached evidence

**Failure:** Cached repository/scope/reference content survives source changes.

**Consequence:** Agent reasons from obsolete state.

**Mitigation:** Version and invalidate mutable knowledge; prefer live authoritative reads for volatile facts.

### 21.5 Cross-scope reuse

**Failure:** Caches unintentionally span consumers/users/security scopes.

**Consequence:** Privacy, billing, or information-leak risks.

**Mitigation:** Scope caches explicitly and follow provider isolation guidance.

### 21.6 Overengineering explicit caching

**Failure:** Application code gains complex cache lifecycle logic before reuse patterns are understood.

**Consequence:** Operational complexity exceeds savings.

**Mitigation:** Start with provider defaults and add explicit controls only after measurement.

### 21.7 Preserving history solely for cache reuse

**Failure:** Compaction is delayed to avoid invalidating cached prefixes.

**Consequence:** Context becomes bloated or semantically noisy.

**Mitigation:** Prioritize context quality and total workflow economics.

---

## 22. Initial platform guidance

### AEP-CTX-011-G1 — Cache only after relevance selection
**Status:** Recommended

Context should first earn inclusion in active context. Cacheability is a secondary optimization.

### AEP-CTX-011-G2 — Put stable reusable context before volatile context where provider semantics reward prefix stability
**Status:** Recommended

Do not allow timestamps, random ordering, or task-specific material to unnecessarily fragment reusable prefixes.

### AEP-CTX-011-G3 — Keep stable structures deterministic
**Status:** Recommended

Tool definitions, policy blocks, and shared reference ordering should be deterministic when their semantics are unchanged.

### AEP-CTX-011-G4 — Measure total workflow economics
**Status:** Recommended

Track cache reads/writes or storage, total input, latency, task quality, and invalidation behavior—not only hit rate.

### AEP-CTX-011-G5 — Prefer implicit caching before custom lifecycle machinery
**Status:** Provisional

Where provider-managed caching is available, begin there unless explicit caching solves a measured problem.

### AEP-CTX-011-G6 — Do not preserve irrelevant history for cache reuse
**Status:** Recommended

Compaction and context reduction remain valid even when they temporarily reduce cache hits.

### AEP-CTX-011-G7 — Treat explicit cache retention as data governance
**Status:** Recommended

Cache lifetime and storage semantics must comply with scope and enterprise data requirements.

### AEP-CTX-011-G8 — Scope caches no more broadly than required
**Status:** Recommended

Cost optimization must not weaken tenant, repository, user, or authorization boundaries.

### AEP-CTX-011-G9 — Keep cache semantics behind provider adapters
**Status:** Recommended

Handbook and application architecture should remain portable across changing vendor APIs.

---

## 23. Open questions

This chapter adds the following questions to the central research register:

- Q-CACHE-001 — Which context classes produce the highest net savings from caching in coding-agent workloads?
- Q-CACHE-002 — How should cache-friendly layout interact with progressive disclosure and dynamic tool loading?
- Q-CACHE-003 — When does explicit caching outperform provider-managed implicit caching after operational complexity is included?
- Q-CACHE-004 — What cache invalidation keys are required for repository and project knowledge?
- Q-CACHE-005 — How should compaction thresholds change when large portions of conversation history are cached?
- Q-CACHE-006 — Which cache metrics best predict end-to-end agent economics?
- Q-CACHE-007 — When is cache prewarming worthwhile for developer-agent sessions?
- Q-CACHE-008 — How should cache isolation be represented across scope, repository, user, and session scopes?

---

## 24. Experiment proposals

### EXP-CTX-009 — Cache-Aware Context Layout

Already present in the backlog; this chapter refines its purpose.

Compare semantically equivalent context layouts with different stable/volatile ordering.

Measure:

- cache read/write tokens or equivalent provider metrics;
- total input cost;
- time to first token;
- end-to-end task latency;
- task success;
- context size;
- invalidation frequency.

### EXP-CTX-029 — Progressive Disclosure vs Cache-Optimized Static Prefix

Compare:

1. large static cache-friendly prefix;
2. progressive disclosure with smaller active context;
3. progressive disclosure plus caching of frequently reused disclosed content.

Primary question:

> Does reduced active context outweigh the cache efficiency of a larger static prefix?

### EXP-CTX-030 — Explicit vs Implicit Caching

For providers supporting both modes, compare:

- provider-managed implicit caching;
- explicit stable breakpoints/objects;
- no caching baseline where measurable.

Evaluate total operational benefit rather than hit percentage alone.

### EXP-CTX-031 — Cache-Aware Compaction

Compare long-running sessions using:

- compaction based only on context quality/size;
- delayed compaction favoring cache reuse;
- combined policies optimizing total cost and task continuity.

The experiment should determine whether cache preservation materially changes the optimal compaction policy.

---

## 25. Recommended instrumentation

Agent traces should record caching information when the provider exposes it.

Suggested normalized fields:

```yaml
cache:
  provider: openai
  mode: implicit
  scope: repository-session
  input_tokens: 18000
  cached_read_tokens: 12000
  cache_write_tokens: 0
  estimated_cache_cost: null
  ttl_seconds: null
  context_version: repo-guidance-v12
```

Provider adapters can populate only supported fields.

At the aggregate level, track:

- cache-eligible tokens;
- cache-read ratio;
- cache-write frequency;
- net token cost;
- latency savings;
- invalidations;
- task-success correlation.

---

## 26. Relationship to future the platform MCP

The future handbook MCP should not simply return a large stable block because that block happens to cache well.

Instead:

```text
request
   ↓
resolve applicable guidance
   ↓
retrieve smallest sufficient knowledge
   ↓
classify stable vs volatile
   ↓
construct provider-neutral context package
   ↓
provider adapter optimizes cache placement
```

This preserves the separation between:

- **knowledge selection**;
- **context construction**;
- **provider-specific inference optimization**.

That separation will make the system easier to test and substantially more portable.

---

## 27. External evidence baseline

The initial guidance in this chapter is informed by current provider documentation as of 2026-09-30.

### OpenAI

OpenAI documents prefix-based prompt caching for supported models and recommends placing stable instructions and reference material before dynamic content, keeping tool definitions/order stable, and preserving append-only conversation history where appropriate. GPT-5.6-and-later models additionally expose explicit prompt-cache breakpoints and cache policy controls. OpenAI also documents that compaction can reduce cache reuse because it changes earlier context.

References:

- https://developers.openai.com/api/docs/guides/prompt-caching
- https://developers.openai.com/api/docs/guides/deployment-checklist

### Google Gemini

Google documents implicit context caching for current Gemini model families and explicit cached-content objects in supported APIs. Its guidance similarly recommends placing large common content at the beginning of prompts for implicit reuse. Explicit caches introduce configurable TTL/storage semantics and are presented for recurring work over large repeated inputs, including repository analysis.

References:

- https://ai.google.dev/gemini-api/docs/caching
- https://ai.google.dev/gemini-api/docs/optimization

Provider-specific behavior is intentionally not promoted to a permanent the platform architectural requirement.

---

## 28. Conclusion

Caching can materially improve agent cost and latency, especially when agents repeatedly process stable instructions, tools, references, or growing conversation prefixes.

But caching should remain subordinate to context quality.

The durable the platform principle is:

> **First minimize and structure the context the agent actually needs. Then make the reusable portion cheap.**

A system with excellent retrieval, progressive disclosure, compaction, and context selection may send fewer tokens even if its cache-hit rate is lower.

That is preferable to a highly cached system carrying large amounts of irrelevant context.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-context.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-CTX-001 — Context Engineering Fundamentals](AEP-CTX-001-context-engineering-fundamentals.md)
- [AEP-CTX-007 — Progressive Disclosure](AEP-CTX-007-progressive-disclosure.md)
- [AEP-CTX-008 — Context Compression and Compaction](AEP-CTX-008-context-compression-and-compaction.md)
- [AEP-CTX-009 — Working Memory and Persistent Memory](AEP-CTX-009-working-memory-and-persistent-memory.md)
- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
