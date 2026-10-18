---
schema_version: '1.0'
id: AEP-CTX-012
title: Context Failure Modes
summary: 'Context Failure Modes. Focus: context compaction, context failures, prompt injection.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- context-engineering
tags:
- context-compaction
- context-failures
- prompt-injection
scope:
- enterprise-global
related:
- AEP-CTX-001
- AEP-CTX-002
- AEP-CTX-003
- AEP-CTX-007
- AEP-CTX-008
- AEP-CTX-009
- AEP-CTX-010
- AEP-CTX-011
- AEP-P-003
- AEP-P-006
- AEP-P-011
- AEP-P-012
- AEP-P-013
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/context/AEP-CTX-012-context-failure-modes.md
  original_sha256: cde3d7090e7aec10415afe9261cda34636caab608760b6cdda86c03c1db35fb5
  original_metadata_record: handbook/context/AEP-CTX-012-context-failure-modes.md
  authority: inherited-source-context
---

# AEP-CTX-012 — Context Failure Modes

## 1. Purpose

Context failures occur when an agent receives, preserves, prioritizes, retrieves, or interprets information in a way that degrades task performance or violates the intended authority model.

They are broader than prompt injection.

A context failure can be caused by:

- too much information;
- too little information;
- irrelevant information;
- stale information;
- contradictory information;
- incorrectly trusted information;
- missing provenance;
- poor retrieval;
- lossy compaction;
- contaminated memory;
- oversized tool outputs;
- poor context ordering;
- or information that was correct but applied outside its intended scope.

The goal of this chapter is to establish a common failure taxonomy that can be used during design, debugging, incident analysis, and evaluation.

> **Context correctness is not only about whether information is true. It also depends on whether it is relevant, current, authoritative, appropriately scoped, and presented at the right time.**

---

## 2. Why a failure taxonomy matters

Agent behavior is often diagnosed at the wrong layer.

A developer may conclude that:

```text
"the model is bad at this task"
```

when the actual failure was:

```text
wrong file retrieved
      ↓
stale implementation loaded
      ↓
correct reasoning over incorrect evidence
```

or:

```text
relevant policy present
      ↓
80K tokens of competing context
      ↓
policy ignored or misapplied
```

or:

```text
untrusted README contains instructions
      ↓
agent interprets them as operating policy
      ↓
tool call exceeds intended authority
```

A useful taxonomy allows failures to be attributed to the system component that can actually fix them.

---

## 3. Context failure model

the platform classifies context failures across six dimensions:

```text
Availability   — Was required information present?
Selection      — Was the right information selected?
Quality        — Was the information accurate and current?
Authority      — Was it allowed to influence behavior at that level?
Interpretation — Did the model understand and apply it correctly?
Lifecycle      — Was it retained, compacted, invalidated, or removed correctly?
```

These dimensions are intentionally separate.

For example, a retrieved document may be:

- relevant;
- accurate;
- recent;
- but untrusted as an instruction source.

Conversely, a enterprise standard may be:

- authoritative;
- trusted;
- but irrelevant to the current task.

---

# 4. Failure Class: Under-Contexting

Under-contexting occurs when the agent lacks information necessary to make a correct decision.

Typical symptoms:

- inventing APIs that already exist;
- duplicating functionality;
- editing the wrong implementation;
- violating local conventions;
- failing tests that nearby code would have revealed;
- incorrect assumptions about dependency boundaries;
- repeatedly asking questions answerable from available sources.

Common causes:

```text
insufficient repository exploration
retrieval recall too low
missing tool access
poor search query
premature narrowing
over-aggressive context pruning
failed memory recall
compaction removed required state
```

### Mitigations

- provide discovery tools;
- improve retrieval recall;
- make repository structure discoverable;
- retain task constraints in structured working state;
- allow recovery from durable source material;
- detect low-evidence decisions;
- require source inspection before high-impact changes.

### Evaluation signal

Measure whether relevant evidence was available to the agent before the incorrect decision occurred.

---

# 5. Failure Class: Over-Contexting

Over-contexting occurs when unnecessary information competes with relevant information.

Large context windows reduce storage pressure but do not eliminate attention limits.

Potential symptoms include:

- ignoring an important constraint that is present;
- citing older instructions instead of newer ones;
- copying patterns from unrelated modules;
- degraded tool selection;
- increased latency and token cost;
- contradictory reasoning across a long session.

Anthropic describes this broader degradation as **context rot**: recall and focus can decline as context grows even when information technically remains inside the supported context window.

### Important distinction

```text
fits in context != useful in context
```

### Mitigations

- progressive disclosure;
- task-scoped retrieval;
- context budgets;
- diversity-aware selection;
- compaction;
- removal of stale tool output;
- dynamic capability loading;
- explicit context retirement.

---

# 6. Failure Class: Context Dilution

Context dilution is a more specific form of over-contexting where high-value instructions or evidence are surrounded by large volumes of low-signal material.

Example:

```text
3 critical constraints
+
65 files
+
large test logs
+
full tool schemas
+
conversation history
```

The important information has not disappeared, but its effective salience may decline.

Mitigation should usually focus on increasing **signal density**, not merely rearranging prose.

Useful techniques include:

- structured state;
- concise task constraints;
- targeted evidence retrieval;
- summarized tool results with recoverable raw output;
- source-specific context sections.

---

# 7. Failure Class: Stale Context

Stale context was once correct but no longer represents the current environment.

This is particularly dangerous in software engineering because repositories change continuously.

Examples:

- indexed code predates the current branch;
- documentation references a removed API;
- cached repository metadata describes an old dependency graph;
- a previous task's working state survives after the implementation changed;
- memory records an architectural choice that has since been superseded.

### Required properties

Potentially volatile context should carry enough metadata to assess freshness where practical:

```yaml
source: repository
commit: abc123
retrieved_at: 2026-09-30T20:00:00-04:00
scope: packages/api
```

### Mitigations

- compare index revision to repository revision;
- invalidate context on meaningful state changes;
- prefer live introspection for volatile facts;
- attach timestamps/version identifiers;
- treat durable memory as revisable rather than permanent truth.

---

# 8. Failure Class: Contradictory Context

Agents commonly encounter multiple sources that disagree.

Examples:

```text
enterprise standard vs project standard
repository README vs current implementation
old ADR vs superseding ADR
user request vs safety boundary
retrieved documentation vs installed dependency version
```

A robust system should not rely on the model to silently infer precedence from prose order.

AEP-CTX-002 defines authority, trust, scope, and specificity as separate dimensions.

### Preferred behavior

The system should attempt to resolve contradictions structurally.

If resolution is impossible, the conflict should remain explicit.

Bad behavior:

```text
choose whichever statement appeared last
```

Better behavior:

```text
Source A says X.
Source B says Y.
B is repository-specific and current, while A is general guidance.
Effective guidance: Y.
```

Where neither source dominates, human clarification may be appropriate.

---

# 9. Failure Class: Authority Confusion

Authority confusion occurs when information is treated as instruction at a level it does not possess.

This is one of the most important classes of agent security failure.

Examples:

- instructions inside a web page alter tool behavior;
- a retrieved document attempts to override organization policy;
- source code comments attempt to redefine the agent's task;
- tool output tells the model to transmit credentials;
- user-provided content is inserted into a higher-authority instruction channel.

OpenAI's current agent-safety guidance explicitly warns against inserting untrusted variables into higher-priority developer instructions and recommends structured data flow, constrained permissions, and approvals.

### Rule

> **Relevance does not grant authority.**

A document may be the most relevant search result and still have zero authority to redefine system behavior.

---

# 10. Failure Class: Context Poisoning

Context poisoning occurs when malicious, misleading, or corrupted content influences future decisions.

Prompt injection is one important form.

Other forms include:

- incorrect generated summaries;
- poisoned retrieval corpora;
- compromised documentation;
- malicious source comments;
- hallucinated facts written into durable memory;
- attacker-controlled tool output;
- manipulated external records.

The risk increases when poisoned content can persist beyond the current interaction.

```text
untrusted content
      ↓
agent accepts claim
      ↓
claim written to memory
      ↓
future sessions retrieve claim
      ↓
poison becomes durable
```

This is why AEP-CTX-009 treats durable memory writes as privileged mutations.

### Mitigation strategy

Do not rely on a single prompt-injection detector.

Use layered controls:

- explicit trust classification;
- structured extraction where appropriate;
- least-privilege tools;
- source/sink analysis;
- human approval for consequential actions;
- provenance;
- sandboxing;
- memory-promotion controls;
- security evaluation.

---

# 11. Failure Class: Retrieval Flooding

Retrieval flooding occurs when a retriever returns too many superficially relevant candidates, causing redundant or low-value context to dominate the working set.

Possible causes:

- overly broad semantic matches;
- duplicate chunks;
- generated documentation copies;
- similar boilerplate across services;
- large candidate counts with weak pruning;
- repeated parent/child overlap.

### Mitigations

- deduplication;
- metadata filtering;
- reranking;
- diversity-aware selection;
- candidate-depth tuning;
- per-source limits;
- parent/child consolidation.

Retrieval recall should not be maximized without considering downstream context precision.

---

# 12. Failure Class: Retrieval Blind Spots

Retrieval blind spots occur when important information is systematically difficult for the retrieval architecture to surface.

Examples:

- exact identifiers split poorly by lexical tokenization;
- semantic search misses generated names;
- embeddings ignore file hierarchy;
- repository maps omit runtime configuration;
- git history is not indexed;
- hidden/generated files are excluded too aggressively;
- metadata filters remove the relevant source.

These failures often require **multiple retrieval channels**, not simply a better embedding model.

---

# 13. Failure Class: Scope Leakage

Scope leakage occurs when context from one authority domain becomes visible or influential in another.

Examples:

```text
Project A guidance → Project B session
private repo context → unrelated project
user preference → organization policy
experimental finding → approved standard
production secrets → development agent
```

Scope leakage is both a correctness and security problem.

### Mitigations

- explicit scope metadata;
- authorization before retrieval;
- separate indexes or enforced tenant filters;
- cache partitioning;
- memory namespaces;
- provenance in generated context packages.

Authorization must happen before relevance ranking where private information is involved.

---

# 14. Failure Class: Compaction Drift

Compaction drift occurs when repeated summarization gradually changes the task's meaning or loses important detail.

Possible losses include:

- original constraints;
- rejected approaches;
- unresolved bugs;
- exact identifiers;
- evidence provenance;
- user intent;
- known failure states.

Repeated summary-of-summary operations are particularly risky.

### Preferred architecture

```text
durable raw history
        +
structured working state
        +
compact narrative context
```

Compaction should be recoverable whenever practical.

If an agent encounters uncertainty after compaction, it should be able to return to primary source material rather than treating the summary as infallible.

---

# 15. Failure Class: Memory Contamination

Memory contamination occurs when inaccurate, stale, unscoped, or malicious information becomes persistent memory.

Common causes:

- automatically storing model conclusions;
- converting user speculation into facts;
- storing temporary task assumptions indefinitely;
- failing to expire repository-specific information;
- memory promotion without provenance;
- cross-scope retrieval mistakes.

### Rule

> **A statement becoming memorable does not make it true.**

Durable memory should carry provenance, scope, freshness, confidence, and promotion status where those properties matter.

---

# 16. Failure Class: Tool-Output Overload

Tool calls can generate extremely large outputs:

- build logs;
- test output;
- stack traces;
- dependency trees;
- repository listings;
- API responses;
- database results.

Passing every byte directly into active context is rarely necessary.

### Better pattern

```text
raw tool output
      ↓
structured parser / filter
      ↓
compact operational result
      ↓
agent context
```

while retaining the raw artifact for recovery when needed.

Examples:

```text
10,000-line test output
        ↓
failed tests + relevant stack traces + summary
```

or:

```text
entire dependency graph
        ↓
subgraph surrounding affected component
```

The summarizer itself should not become a hidden source of truth. Important raw evidence should remain recoverable.

---

# 17. Failure Class: Context Echo

Context echo occurs when generated information is repeatedly fed back into the system as if independently verified.

Example:

```text
agent hypothesis
   ↓
summary
   ↓
memory
   ↓
retrieval result
   ↓
agent sees the same claim as supporting evidence
```

The result can resemble false consensus.

### Mitigation

Provenance should distinguish:

```text
primary evidence
external source
human decision
model inference
model-generated summary
derived memory
```

Derived information should not silently gain evidentiary weight through repetition.

---

# 18. Failure Class: Premature Context Commitment

An agent may lock onto an early interpretation and retrieve only evidence supporting it.

Example:

```text
initial guess: authentication bug
      ↓
retrieve auth files only
      ↓
ignore networking/configuration evidence
      ↓
reinforce original guess
```

This is a retrieval form of confirmation bias.

### Mitigations

- separate exploration from exploitation;
- allow broad initial discovery;
- retrieve disconfirming evidence for uncertain hypotheses;
- use deterministic diagnostics where available;
- preserve alternative hypotheses in working state.

---

# 19. Failure Class: Instruction Bloat

Instruction bloat occurs when accumulated rules become so numerous or detailed that they become contradictory, hard to maintain, or difficult for the model to prioritize.

Typical causes:

- adding a permanent rule for every past failure;
- duplicating guidance across system prompt, repository files, skills, and task templates;
- keeping obsolete model-specific workarounds;
- using prose where deterministic validation would be stronger.

### Better response to a failure

Before adding another instruction, ask:

```text
Can a deterministic check prevent this?
Can a tool provide the missing evidence?
Should a skill own this guidance?
Is this rule still necessary with the current model?
Can an eval detect regression instead?
```

The handbook should periodically remove scaffolding that no longer produces measurable benefit.

---

# 20. Failure Class: Cache-Driven Bloat

Context caching can make large stable prefixes economically attractive.

That creates a failure mode where unnecessary material is retained solely to maximize cache reuse.

AEP-CTX-011 establishes the governing rule:

> **Relevance decides inclusion. Reuse decides caching.**

Cached irrelevant context still consumes attention and context-window capacity.

---

# 21. Failure Class: Hidden Transformation

Information often passes through transformations before reaching the model:

```text
source
  ↓
parser
  ↓
chunker
  ↓
metadata generation
  ↓
embedding
  ↓
retrieval
  ↓
reranking
  ↓
summarization
  ↓
context formatting
```

Any stage can distort or omit information.

Observability should therefore record enough of this pipeline to reconstruct why a piece of evidence was or was not presented.

At minimum, high-value retrieval systems should be able to answer:

```text
What source was queried?
Which candidates were retrieved?
Which were removed and why?
Which were reranked?
Which were shown to the model?
What transformations occurred?
```

---

# 22. Failure Class: Provenance Loss

Provenance loss occurs when the agent can no longer determine where a claim originated.

Without provenance, it becomes difficult to distinguish:

- current source code from generated summaries;
- organization standards from external recommendations;
- facts from model inference;
- active scoped requirements from old project decisions;
- primary sources from commentary.

AEP-P-013 therefore treats provenance as a core requirement rather than optional metadata.

---

# 23. Failure Class: Authority Without Capability Boundaries

Even perfect context handling cannot guarantee safe behavior when a manipulated agent has excessive authority.

Modern prompt-injection research increasingly treats this as a source/sink problem:

```text
untrusted source
      +
dangerous capability
      =
material risk
```

The system should therefore reduce the consequence of context failures through:

- least privilege;
- sandboxing;
- scoped credentials;
- explicit approvals;
- reversible operations;
- rate and cost limits;
- network restrictions;
- deterministic policy enforcement.

> **Context security and capability security are complementary. Neither replaces the other.**

---

# 24. Failure Class: Silent Recovery Failure

Agents often recover from errors successfully, but a failed recovery can create misleading state.

Example:

```text
edit fails
   ↓
agent assumes edit succeeded
   ↓
subsequent reasoning depends on nonexistent change
```

Similar problems occur when:

- a tool result is truncated;
- a file read is partial;
- a retrieval service times out;
- a cache misses;
- an index is stale;
- a subagent fails silently.

Tool and retrieval failures should be represented explicitly rather than converted into plausible empty results.

---

# 25. Detecting context failures

Many context failures are not visible from the final response alone.

Useful telemetry includes:

```text
active context size
context source breakdown
retrieved candidate count
selected candidate count
retrieval/rerank scores
source age
source scope
instruction conflicts
memory writes
compaction events
tool-output size
truncation events
cache metrics
tool authority
approval events
```

Trace-based analysis is therefore a core part of context debugging.

OpenAI's current agent guidance recommends trace graders and evals to inspect not only final answers but also tool calls and intermediate behavior.

---

# 26. Context health metrics

No single metric captures context quality.

Potential metrics include:

### Availability

- required-evidence recall;
- missing-context rate.

### Precision

- fraction of active context judged relevant;
- duplicate-context rate.

### Freshness

- stale-source rate;
- index/repository revision mismatch rate.

### Authority

- unauthorized instruction-following rate;
- prompt-injection success rate.

### Lifecycle

- compaction information-loss rate;
- stale-memory retrieval rate;
- invalidated-context reuse rate.

### Efficiency

- active tokens;
- retrieved tokens;
- discarded tokens;
- tool-output compression ratio;
- cost;
- latency.

### Outcome

- task success;
- deterministic verification pass rate;
- human intervention rate.

Context metrics should ultimately be correlated with downstream task success rather than optimized independently.

---

# 27. Context failure response ladder

When an agent fails, debugging should move through a structured sequence.

```text
1. Was the required information available?
                 ↓
2. Was it retrieved or loaded?
                 ↓
3. Was it current and correct?
                 ↓
4. Was its authority represented correctly?
                 ↓
5. Was conflicting information resolved?
                 ↓
6. Was the active context overloaded?
                 ↓
7. Did compaction or memory alter it?
                 ↓
8. Did the model misinterpret correct context?
                 ↓
9. Did tool/capability boundaries limit damage?
```

Only after these questions should the failure automatically be attributed to model capability.

---

# 28. Recommended platform failure taxonomy

For incident and eval labeling, use the following initial categories:

```text
CTX-AVAIL   missing required context
CTX-OVER    excessive context
CTX-DILUTE  low signal density
CTX-STALE   outdated context
CTX-CONFLICT contradictory context
CTX-AUTH    authority/trust confusion
CTX-POISON  malicious or corrupted context
CTX-FLOOD   retrieval flooding
CTX-BLIND   retrieval blind spot
CTX-SCOPE   scope leakage
CTX-COMPACT compaction drift
CTX-MEM     memory contamination
CTX-TOOL    tool-output overload or distortion
CTX-ECHO    generated evidence feedback loop
CTX-ANCHOR  premature context commitment
CTX-INSTR   instruction bloat
CTX-CACHE   cache-driven bloat
CTX-XFORM   transformation loss
CTX-PROV    provenance loss
CTX-RECOVER silent recovery failure
```

A failure may receive multiple labels.

Example:

```text
CTX-STALE + CTX-PROV
```

might identify a bug caused by outdated documentation whose version was not represented in retrieved context.

---

# 29. Evaluation implications

Context evaluations should deliberately introduce adverse conditions rather than test only clean examples.

Evaluation datasets should include:

- irrelevant distractors;
- conflicting instructions;
- stale documentation;
- misleading comments;
- duplicated retrieval results;
- missing files;
- oversized tool outputs;
- partial failures;
- malicious prompt injections;
- poisoned candidate memories;
- cross-scope lookalikes;
- long task histories requiring compaction.

The objective is not merely to ask whether the system succeeds when supplied perfect context.

The stronger question is:

> **Does the system remain reliable when context is imperfect, adversarial, incomplete, or excessive?**

---

# 30. Proposed experiments

## EXP-CTX-032 — Distractor Density and Context Rot

**Hypothesis:** Increasing irrelevant but plausible context will degrade coding-agent task success before the context-window limit is reached, and targeted retrieval/progressive disclosure will reduce that degradation.

Measure:

- task success;
- constraint recall;
- active tokens;
- latency;
- cost;
- incorrect-source usage.

---

## EXP-CTX-033 — Raw vs Structured Tool Output

**Hypothesis:** Supplying compact structured tool results while retaining recoverable raw output will improve task success and reduce active-context usage compared with directly injecting complete tool output.

Candidate workloads:

- test failures;
- compiler diagnostics;
- build logs;
- dependency graphs;
- repository search results.

---

## EXP-CTX-034 — Provenance and Freshness Labels

**Hypothesis:** Explicit source, scope, and freshness metadata will reduce stale-context and conflict-resolution failures in repositories containing deliberately contradictory historical material.

---

# 31. Initial platform guidance

the platform currently recommends:

1. Treat context as typed, scoped information rather than undifferentiated text.
2. Preserve the distinction between relevance, trust, authority, freshness, and provenance.
3. Prefer the smallest sufficient active context, not the smallest possible context.
4. Keep raw source material recoverable when using lossy transformations.
5. Treat prompt injection as one member of a broader context-poisoning class.
6. Prevent untrusted content from gaining instructional authority through retrieval or placement.
7. Apply authorization and scope/repository isolation before relevance ranking.
8. Treat durable memory writes as privileged operations.
9. Explicitly detect stale indexes, stale memory, and version mismatches where feasible.
10. Summarize or structure large tool outputs before placing them in active context.
11. Avoid optimizing cache hit rate, retrieval recall, or context utilization independently of task success.
12. Record context transformations and retrieval decisions in traces where operationally reasonable.
13. Test systems against noisy, stale, conflicting, and adversarial context—not only ideal inputs.
14. Use deterministic capability boundaries so context failure does not automatically become operational compromise.
15. Diagnose context pipeline failures before concluding that a task requires a more capable model.

---

# 32. Evidence status

### Strong external support

- context is a finite attention resource and excessive context can degrade focus;
- prompt injection remains a major agent security risk;
- untrusted content should not be elevated into privileged instruction channels;
- tool authority and human approvals can reduce impact when model behavior is manipulated;
- trace/eval inspection is useful for diagnosing agent behavior.

### Recommended but requiring the platform validation

- explicit context-failure taxonomy;
- structured tool-output reduction;
- provenance/freshness metadata as an agent-visible feature;
- context-health metrics;
- explicit exploration against premature context commitment.

### Experimental

- specific context-budget thresholds;
- quantitative distractor-density limits;
- optimal provenance representation;
- automatic context-health scoring.

---

# 33. References

Primary sources consulted for this version include:

- OpenAI, **Safety in building agents** — prompt injection, structured outputs, approvals, guardrails, and trace graders.
- OpenAI, **Designing AI agents to resist prompt injection** (2026) — social-engineering framing, source/sink analysis, and limiting consequences of compromised agent behavior.
- OpenAI, **Understanding prompt injections** — layered defenses, least-necessary access, confirmations, and explicit task scope.
- Anthropic, **Effective context engineering for AI agents** — finite attention, context rot, minimal high-signal context, tools, examples, and selective retrieval.
- Microsoft Security, **When prompts become shells: RCE vulnerabilities in AI agent frameworks** (2026) — demonstration that prompt injection combined with dangerous tool capability can become host-level compromise.

Vendor-specific implementation details should be revalidated against current documentation before operational adoption.

---

# 34. Conclusion

Context engineering is not successful merely when the agent receives enough information.

A robust system must ensure that context is:

```text
available
relevant
current
properly scoped
correctly trusted
traceable
recoverable
and proportionate to the task
```

The practical goal is therefore not maximum context.

It is **controlled evidence flow**.

That principle will carry forward into later handbook sections on tools, MCP, agent architecture, memory, security, evaluation, and long-running execution.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-context.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-CTX-001 — Context Engineering Fundamentals](AEP-CTX-001-context-engineering-fundamentals.md)
- [AEP-CTX-002 — Context Sources and Instruction Hierarchy](AEP-CTX-002-context-sources-and-instruction-hierarchy.md)
- [AEP-CTX-003 — Retrieval Architecture](AEP-CTX-003-retrieval-architecture.md)
- [AEP-CTX-007 — Progressive Disclosure](AEP-CTX-007-progressive-disclosure.md)
- [AEP-CTX-008 — Context Compression and Compaction](AEP-CTX-008-context-compression-and-compaction.md)
- [AEP-CTX-009 — Working Memory and Persistent Memory](AEP-CTX-009-working-memory-and-persistent-memory.md)
- [AEP-CTX-010 — Repository Context and Code Intelligence](AEP-CTX-010-repository-context-and-code-intelligence.md)
- [AEP-CTX-011 — Context Caching](AEP-CTX-011-context-caching.md)
- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
