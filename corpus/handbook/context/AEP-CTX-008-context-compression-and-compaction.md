---
schema_version: '1.0'
id: AEP-CTX-008
title: Context Compression and Compaction
summary: 'Context Compression and Compaction. Focus: context compaction, memory.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- context-engineering
tags:
- context-compaction
- memory
scope:
- enterprise-global
- software-development-agents
related:
- AEP-CTX-001
- AEP-CTX-007
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 120d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/context/AEP-CTX-008-context-compression-and-compaction.md
  original_sha256: 0935822a0303c180379e1e45ca6f97024e96f6dcadb0eabc44b26235961c5fa3
  original_metadata_record: handbook/context/AEP-CTX-008-context-compression-and-compaction.md
  authority: inherited-source-context
---

# AEP-CTX-008 — Context Compression and Compaction

## 1. Summary

Long-running agents eventually accumulate more conversational history, tool output, reasoning residue, intermediate plans, failures, and stale details than should remain in active model context.

Context compression and compaction are therefore not merely token-saving techniques. They are mechanisms for **preserving continuity while reducing active-context load**.

the platform currently recommends that long-running agents separate three concerns:

1. **durable history** — recoverable source material and execution history;
2. **working state** — explicit structured state required to continue the task;
3. **active context** — the compact set of information supplied to the model for the current step.

The preferred architecture is therefore:

```text
raw history + artifacts + trace
            │
            ├───────────────┐
            │               │
            ▼               ▼
     structured state    retrievable history
            │               │
            └───────┬───────┘
                    ▼
              compaction
                    │
                    ▼
              active context
```

Compaction should reduce redundancy and stale detail without making important history unrecoverable.

## 2. Current State of Practice

Modern agent platforms increasingly provide first-class compaction because long-running tasks can span multiple context windows.

OpenAI's current Responses API supports both automatic server-side compaction and an explicit standalone compaction endpoint. The resulting compacted context carries forward prior state in a smaller representation while allowing the application to continue a long-running workflow. OpenAI also recommends compaction after meaningful milestones so obsolete tool logs, retries, and abandoned branches do not crowd out the state needed for later work.

The OpenAI Agents API likewise automatically compacts earlier context as long-running sessions approach context limits.

Anthropic describes compaction as one of several context-management techniques for long-horizon work, alongside structured memory and sub-agent architectures. Anthropic's long-running-agent guidance also emphasizes that compaction by itself is insufficient: agents need external state, incremental work, tests, artifacts, and explicit progress tracking so they can recover across context resets.

These systems support a common conclusion:

> Long-running continuity should not depend on retaining an ever-growing transcript verbatim in active context.

## 3. Compression, Summarization, and Compaction

These terms overlap but should be distinguished.

### Compression

Any transformation that represents information with fewer active-context tokens.

Examples:

- removing redundant tool logs;
- converting verbose output into structured fields;
- deduplicating repeated instructions;
- reducing a long document to selected excerpts;
- encoding state in a compact structured representation.

### Summarization

A lossy natural-language transformation intended to preserve the important meaning of a larger source.

Example:

```text
120 turns of debugging history
        ↓
"The failure was narrowed to stale IAM credentials. Attempts A and B failed;
refresh-on-connection is the remaining hypothesis."
```

Summaries are useful but can omit details, introduce interpretation, or erase uncertainty.

### Compaction

A broader context-management operation that replaces or transforms accumulated active context into a smaller continuation state.

Compaction may use summarization internally, but it can also preserve structured state, selected verbatim items, opaque model-native state, artifact references, or other representations.

the platform should therefore avoid assuming that **compaction = one prose summary**.

## 4. The Principal Risk: Silent Information Loss

A failed tool call is visible.

A bad summary can be invisible.

If compaction drops an important requirement, incorrectly resolves an uncertainty, or rewrites a provisional observation as fact, subsequent reasoning may remain internally coherent while operating from false state.

This makes compaction failures particularly dangerous.

Examples include:

- forgetting a user constraint;
- dropping an unresolved test failure;
- losing the reason an earlier approach was rejected;
- collapsing two competing hypotheses into one apparent conclusion;
- forgetting that a production mutation requires approval;
- losing identifiers required to recover an external resource;
- summarizing exact code or configuration incorrectly;
- discarding provenance.

A good compaction system must therefore optimize **state preservation**, not merely token reduction.

## 5. the platform State Classification

Before compacting context, agents should classify information by persistence needs.

### A. Governing constraints

Examples:

- task objective;
- acceptance criteria;
- authority limits;
- scoped requirements;
- repository policies;
- security constraints.

These should normally survive compaction explicitly.

### B. Decisions

Examples:

- chosen architecture;
- rejected alternatives;
- implementation conventions;
- model/tool selection decisions.

A decision should preserve both the choice and enough rationale to avoid reopening already-resolved work unnecessarily.

### C. Current working state

Examples:

- current phase;
- files being modified;
- tests currently failing;
- active hypothesis;
- remaining subtasks.

This state is often better represented structurally than narratively.

### D. Evidence and observations

Examples:

- compiler output;
- benchmark results;
- retrieved documentation;
- logs;
- repository facts.

Large evidence should usually remain durable and retrievable rather than copied wholesale into the compacted state.

### E. Ephemeral process history

Examples:

- failed exploratory commands;
- dead-end searches;
- superseded plans;
- verbose intermediate reasoning;
- repetitive tool output.

This is the primary target for removal from active context.

## 6. Structured State Before Prose Summary

Where information has a stable schema, prefer structured state.

Instead of:

```text
We tried several things and eventually determined that the API implementation
works, but the integration test still fails because the fixture uses the old
schema, and we still need to update that plus rerun lint and typecheck.
```

prefer:

```yaml
phase: implementation
completed:
  - api implementation
remaining:
  - update integration fixture
  - run lint
  - run typecheck
known_failures:
  - test: customer-profile.integration
    cause: stale fixture schema
```

Structured state is easier to validate, diff, query, and selectively reload.

Narrative summaries remain useful for information that does not fit a rigid schema.

## 7. Preserve Exact Information When Exactness Matters

Some information should not be paraphrased.

Examples include:

- identifiers;
- file paths;
- API names;
- exact errors;
- hashes;
- command lines;
- schema fragments;
- configuration values;
- contractual requirements;
- approval state;
- security boundaries.

These should either remain verbatim in working state or be referenced through a durable artifact.

A summary such as:

> "The database error involved authentication."

is not equivalent to preserving:

```text
FATAL: PAM authentication failed for user "service_customer_profile"
```

The latter may be critical to later diagnosis.

## 8. Durable History and Recoverability

the platform should prefer compaction designs where original history remains recoverable when operationally and legally appropriate.

This allows an agent or human to answer:

> Why did we make this decision?

> What was the original error?

> Which alternative had already been tested?

> Did the user actually request this constraint?

Durable history can include:

- conversation/event logs;
- execution traces;
- git history;
- generated artifacts;
- test outputs;
- tool-call records;
- stored research sources;
- task journals.

Compaction then becomes a **view over durable history**, not destructive replacement of institutional memory.

## 9. Checkpoint-Oriented Compaction

Compaction should preferably occur around meaningful workflow boundaries rather than solely when the context window is almost exhausted.

Useful checkpoints include:

- requirements understood;
- architecture selected;
- implementation phase completed;
- root cause identified;
- test suite reaches a stable state;
- PR created;
- deployment completed;
- human approval obtained.

At each checkpoint, the harness can capture:

```yaml
objective: ...
constraints: ...
decisions: ...
completed: ...
remaining: ...
known_failures: ...
artifacts: ...
evidence_refs: ...
approvals: ...
```

Then older process noise can be compacted more aggressively.

## 10. Reactive vs Proactive Compaction

### Reactive compaction

Triggered when the active context approaches a token threshold.

Advantages:

- easy to implement;
- protects against hard context exhaustion.

Limitations:

- compaction may occur at an awkward reasoning boundary;
- obsolete material may degrade performance long before the hard limit is reached.

### Proactive compaction

Triggered by task semantics or milestones.

Examples:

- after debugging concludes;
- after a plan is accepted;
- after a subtask is merged;
- after large tool outputs have been processed.

the platform should support both.

Token thresholds provide safety; semantic checkpoints improve context quality.

## 11. Selective Retention

A compaction operation should conceptually decide among:

```text
retain verbatim
retain structurally
summarize
reference externally
discard from active context
```

This is more expressive than a binary keep/drop decision.

For example:

| Information | Preferred treatment |
|---|---|
| Task objective | retain verbatim/structured |
| Security boundary | retain verbatim/structured |
| Architecture decision | structured + brief rationale |
| Large log file | external reference |
| Exact current error | retain verbatim |
| Failed exploratory commands | usually discard |
| Old hypothesis | retain only if its rejection matters |
| Completed subtask details | summarize/reference |

## 12. Context Rot

A context can become harmful before it becomes full.

Long histories may accumulate:

- stale assumptions;
- superseded plans;
- repeated information;
- obsolete tool outputs;
- conflicting intermediate conclusions;
- irrelevant discussion.

This can produce **context rot**: degradation caused by carrying too much low-value or outdated state forward.

Compaction therefore serves quality as well as capacity.

A practical heuristic is:

> Compact when the information needed for the next phase is materially simpler than the history required to reach the current phase.

## 13. Tool Output Compression

Tool output is a major source of context growth.

Instead of returning a 20,000-line log directly to the model, deterministic code can often extract:

```yaml
exit_code: 1
failed_tests:
  - customer-profile.integration
first_relevant_error: "expected field 'status'"
artifact: artifacts/test-run-20260930.log
```

The full log remains available through the artifact reference.

This follows the broader principle:

> Move deterministic filtering and aggregation outside the model context whenever possible.

The model should receive enough information to reason, plus the ability to inspect the underlying source when necessary.

## 14. Compaction and Retrieval

Compaction and retrieval are complementary.

Compaction determines what remains in the immediate continuation state.

Retrieval determines what older or external information should be restored when it becomes relevant again.

A mature long-running system therefore resembles:

```text
                     durable event/history store
                              │
                       retrieval/indexing
                              │
                              ▼
current task → structured state → active context
                     ▲              │
                     │              ▼
                     └──── compaction
```

This architecture reduces pressure on any single summary to preserve every potentially useful detail forever.

## 15. Compaction and Memory

Compaction should not automatically promote temporary task information into long-term memory.

These are separate decisions.

Example:

```text
"Test X currently fails because fixture Y is outdated."
```

This may need to survive the next three context windows but should probably disappear once the task is completed.

By contrast:

```text
"This repository requires migrations to remain backward-compatible for one release."
```

may belong in durable repository guidance.

Compaction answers:

> What must survive this task's continuation?

Memory answers:

> What should remain available beyond this task?

## 16. Compaction and Subagents

Separate agents naturally create separate context boundaries.

A subagent can investigate a large body of information and return a concise artifact to the parent agent.

This can function as a form of context compression, but it has tradeoffs:

- additional model calls;
- additional latency;
- possible loss during summarization;
- duplicated retrieval;
- coordination overhead.

Subagents should therefore not be introduced merely as a workaround for poor context management.

Where parallelism, authority separation, or independent specialization already justifies a subagent, its result should be treated as a compact artifact with provenance and references to underlying evidence.

## 17. Compaction Quality Requirements

A compaction system should be evaluated for more than compression ratio.

Relevant metrics include:

### State preservation

Can the agent accurately recover:

- requirements;
- constraints;
- decisions;
- unresolved questions;
- failures;
- next actions?

### Downstream task success

Does the agent still complete the task correctly after one or more compactions?

### Recovery accuracy

When an omitted detail becomes relevant later, can the agent retrieve the original information?

### Token reduction

How much active context is eliminated?

### Latency

What does compaction itself cost?

### Monetary cost

What model/tool cost is introduced?

### Drift

Does repeated compaction alter facts or progressively distort state?

## 18. Repeated-Compaction Drift

Repeatedly summarizing summaries is especially risky.

Consider:

```text
raw history
   ↓
summary A
   ↓
summary B
   ↓
summary C
```

Each generation creates another opportunity for omission and reinterpretation.

Where possible, later compaction should have access to durable primary state rather than only the previous prose summary.

Prefer:

```text
raw durable state ──────┐
structured state ───────┼→ next compaction
latest working context ─┘
```

rather than indefinitely compressing already-compressed narrative.

## 19. User and Human Visibility

Model-native compaction may be opaque, as in systems that carry internal compressed state not intended for human inspection.

For enterprise and enterprise engineering workflows, the platform should still maintain human-readable task state where auditing, handoff, approval, or debugging requires it.

A useful architecture can therefore maintain both:

```text
model-native continuation state
+
human-readable checkpoint state
+
durable trace/history
```

These solve different problems.

## 20. Failure Modes

### Summary becomes policy

A generated summary accidentally changes a tentative decision into a requirement.

**Mitigation:** preserve provenance and classification.

### Constraint loss

A user or repository requirement disappears during compaction.

**Mitigation:** store governing constraints separately from general narrative.

### Failure amnesia

The agent retries an already-rejected approach because the reason for rejection was lost.

**Mitigation:** preserve rejected approaches when they materially affect future choices.

### Evidence laundering

A summary records a conclusion but loses the evidence/source that supported it.

**Mitigation:** retain evidence references.

### Repeated-summary drift

Multiple generations progressively distort history.

**Mitigation:** re-ground compaction from durable state when possible.

### Over-retention

The system technically compacts but keeps most stale information anyway.

**Mitigation:** measure active-context composition and token reduction.

### Over-compression

Token savings are maximized at the expense of task continuity.

**Mitigation:** optimize downstream success, not compression ratio alone.

## 21. Recommended platform Pattern

For long-running software-development agents, the initial recommended pattern is:

```text
1. Persist artifacts and execution history outside active context.

2. Maintain explicit structured task state:
   objective
   constraints
   decisions
   completed work
   remaining work
   known failures
   approvals
   artifact/evidence references

3. Keep recent, highly relevant interaction context verbatim.

4. Compact older process history at semantic checkpoints and token thresholds.

5. Preserve exact values that matter operationally.

6. Make compacted-away history retrievable where practical.

7. Rehydrate specific historical details only when needed.

8. Evaluate compaction using downstream task success and state-recall tests.
```

## 22. Initial Guidance

### AEP-CTX-008-G1 — Treat compaction as state management, not text shortening

**Status:** Recommended

Optimize for continued task correctness rather than maximum token reduction.

### AEP-CTX-008-G2 — Separate durable history from active context

**Status:** Recommended

Do not require every potentially useful historical detail to remain in the model window.

### AEP-CTX-008-G3 — Preserve governing constraints explicitly

**Status:** Recommended

Critical constraints and authority boundaries should not depend solely on lossy narrative summaries.

### AEP-CTX-008-G4 — Prefer structured state for structured facts

**Status:** Recommended

Use schemas for decisions, tasks, failures, approvals, and artifact references where appropriate.

### AEP-CTX-008-G5 — Preserve exact values when paraphrase can alter meaning

**Status:** Recommended

Identifiers, paths, errors, commands, hashes, and critical configuration should remain exact or externally referenced.

### AEP-CTX-008-G6 — Compact around meaningful milestones

**Status:** Provisional

Semantic checkpoints should complement hard token thresholds.

### AEP-CTX-008-G7 — Avoid repeated lossy summarization without re-grounding

**Status:** Recommended

Repeated summary-of-summary compression should not become the sole source of truth.

### AEP-CTX-008-G8 — Keep discarded information recoverable when feasible

**Status:** Recommended

Compaction should reduce active context without needlessly destroying historical evidence.

### AEP-CTX-008-G9 — Measure downstream success, not only compression ratio

**Status:** Recommended

A smaller context that causes more mistakes is not an improvement.

## 23. Experiment Proposals

### EXP-CTX-007 — Compaction Strategies

Compare:

- rolling prose summary;
- recent-window + summary;
- structured checkpoint state;
- structured state + retrieval over durable history;
- provider-native compaction where available.

Measure long-horizon task success, token use, cost, latency, state recall, and drift.

### EXP-CTX-008 — Durable History With Selective Recall

Compare irreversible compacted history against an architecture retaining raw durable history plus selective retrieval.

Measure recovery from late-emerging dependencies and previously discarded details.

### EXP-CTX-022 — Semantic Checkpoint vs Threshold-Only Compaction

Compare compaction triggered only by context thresholds with compaction performed at meaningful task milestones plus threshold fallback.

Hypothesis:

> Semantic checkpoint compaction reduces stale-context interference and preserves clearer task state without reducing correctness.

### EXP-CTX-023 — Structured State vs Narrative Summary

Compare prose-only summaries with schema-backed checkpoint state for long-running coding tasks.

Measure:

- exact constraint recall;
- unresolved-work recall;
- duplicated work;
- recovery after context reset;
- task success;
- token overhead.

## 24. Open Questions

1. Which information classes should always survive compaction verbatim?
2. How often should checkpoint state be regenerated?
3. What schema provides enough structure without becoming burdensome?
4. How should contradictions between durable history and compacted state be resolved?
5. When should the model itself decide that compaction is useful?
6. How much recent verbatim history should accompany compacted state?
7. How do provider-native compaction mechanisms compare with application-managed structured state?
8. How should compaction behave across multiple agents with separate context windows?
9. What metrics best detect semantic drift after repeated compactions?
10. When should compacted task state be promoted into durable organizational memory?

## 25. References

- OpenAI, **Compaction**, current Responses API documentation, accessed 2026-09-30. https://developers.openai.com/api/docs/guides/compaction
- OpenAI, **API deployment checklist**, current guidance on long-running agents and compaction, accessed 2026-09-30. https://developers.openai.com/api/docs/guides/deployment-checklist
- OpenAI, **From model to agent: Equipping the Responses API with a computer environment**, 2026. https://openai.com/index/equip-responses-api-computer-environment/
- OpenAI, **Introducing the Agents API**, 2026-09-10. https://openai.com/index/introducing-the-agents-api/
- OpenAI, **The builder's guide to GPT-5.6**, 2026. https://openai.com/index/builders-guide-to-gpt-5-6/
- Anthropic, **Effective harnesses for long-running agents**, 2025. https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- Anthropic, **Anthropic at AWS Summit LA 2026 — Effective Context Engineering for AI Agents**, 2026. https://www.anthropic.com/events/anthropic-at-aws-summit-la-2026

## 26. Conclusion

Compaction is necessary because long-running agent work produces more history than should remain active at once.

But the goal is not simply to make history smaller.

The goal is to preserve **continuity, constraints, decisions, recoverability, and evidence** while removing stale process noise from active attention.

the platform should therefore treat context compaction as part of a broader state architecture:

> **durable history + structured working state + selective retrieval + compact active context**

That architecture gives agents room to work for long periods without requiring each new context window to forget how it got there.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-context.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-CTX-001 — Context Engineering Fundamentals](AEP-CTX-001-context-engineering-fundamentals.md)
- [AEP-CTX-007 — Progressive Disclosure](AEP-CTX-007-progressive-disclosure.md)
