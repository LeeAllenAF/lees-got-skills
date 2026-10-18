---
schema_version: '1.0'
id: AEP-CTX-001
title: Context Engineering Fundamentals
summary: 'Context Engineering Fundamentals. Focus: context engineering, memory, progressive disclosure, retrieval.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- context-engineering
tags:
- context-engineering
- memory
- progressive-disclosure
- retrieval
scope:
- enterprise-global
related:
- AEP-P-003
- AEP-P-004
- AEP-P-005
- EXP-CTX-002
- EXP-CTX-003
- EXP-CTX-007
- EXP-SKILL-001
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/context/AEP-CTX-001-context-engineering-fundamentals.md
  original_sha256: b35182d7e48c90724cee108506a14de643324990bd139b6332f139db12b607fc
  original_metadata_record: handbook/context/AEP-CTX-001-context-engineering-fundamentals.md
  authority: inherited-source-context
---

# AEP-CTX-001 — Context Engineering Fundamentals

## 1. Purpose

This document establishes the the platform mental model for context engineering in agentic systems, with an initial emphasis on software-development agents.

Context engineering is the deliberate design of **what information is available to an agent, where that information is stored, when it is materialized into active model context, how it is prioritized, and how it is preserved or discarded over time**.

Prompt engineering is one component of context engineering. It does not cover the full problem.

A production agent may need to reason over instructions, repository state, tools, source code, documentation, prior actions, test results, user requirements, organizational standards, scoped policy, memory, and runtime observations. The engineering challenge is not simply to make all of this information available. It is to make the **right subset available at the right time with the right authority and provenance**.

---

## 2. Core Principle

> **Optimize active context for useful signal, not maximum occupancy.**

The goal is not necessarily a small context window. The goal is the smallest active set of information that preserves the evidence, constraints, state, and capabilities needed for the current reasoning step.

This distinction matters because modern systems can maintain much more information outside the model's immediate context than they materialize into a single inference.

the platform therefore distinguishes three related concepts:

### 2.1 Durable context

Information retained outside the current inference and recoverable later.

Examples:

- session/event history;
- repository files;
- notes and task state;
- handbook documents;
- issue trackers;
- databases;
- vector or lexical indexes;
- artifacts from previous agent runs.

Durable context can be large because it is not automatically placed into every model invocation.

### 2.2 Retrievable context

The subset of durable context that the current agent is authorized and technically able to discover.

Examples include files reachable through repository tools, documents searchable through a knowledge service, skills listed to the agent, and events accessible through a session API.

### 2.3 Active context

The tokens actually presented to the model for the current inference.

Active context can include:

- system and developer instructions;
- user instructions;
- tool descriptions;
- skill metadata or loaded skill content;
- selected conversation history;
- retrieved documents;
- tool results;
- task state;
- summaries or compactions;
- examples.

The active context is the scarce reasoning surface.

---

## 3. Why Context Engineering Exists

Agent systems create a continuously expanding information environment.

A coding task may begin with a single sentence and quickly accumulate:

```text
user request
  + repository instructions
  + source files
  + dependency graph
  + search results
  + build output
  + test failures
  + generated patches
  + tool results
  + agent notes
  + prior reasoning outcomes
  + organizational guidance
```

Naively retaining everything produces several problems:

- increased token cost;
- increased latency;
- irrelevant information competing with relevant information;
- repeated or contradictory instructions;
- stale observations remaining prominent;
- very large tool outputs dominating attention;
- reduced prompt-cache stability when stable content is repeatedly rewritten;
- harder debugging because the actual influence of information becomes unclear.

Modern context engineering therefore increasingly treats the context window as a **working set**, not a database.

---

## 4. Context Is Not Memory

The terms *context* and *memory* are often used interchangeably. the platform will keep them separate.

**Context** is information currently available to the model during inference.

**Memory** is information retained so it can become context later.

An agent can therefore have large memory while maintaining relatively focused active context.

This distinction supports architectures such as:

```text
Durable session history
        │
        ├── current task notes
        ├── historical tool events
        ├── files
        ├── prior decisions
        └── retrieved knowledge
                │
                ▼
         Context selection
                │
                ▼
        Active model context
```

This design reduces pressure to make irreversible summarization decisions too early.

Anthropic's 2026 Managed Agents architecture provides a useful example: durable session events can remain recoverable outside the active context window while the harness selects or transforms portions for current inference. This separates long-term recoverability from active-context management.

---

## 5. Context Sources

A useful taxonomy for agent context is:

### 5.1 Normative instructions

Information that defines desired behavior or constraints.

Examples:

- system policy;
- organization policy;
- project standards;
- repository instructions;
- task requirements;
- loaded skill procedures.

Normative information requires explicit precedence rules.

### 5.2 Environmental state

Information describing the environment in which the agent is operating.

Examples:

- repository layout;
- source code;
- package manifests;
- Git state;
- database schema;
- CI status;
- deployed infrastructure.

This information should usually be discovered from authoritative tools rather than duplicated permanently into prompts.

### 5.3 Evidence

Information needed to answer a question or support a decision.

Examples:

- documentation;
- search results;
- ADRs;
- API references;
- source files;
- runtime logs.

Retrieval quality is especially important for evidence context.

### 5.4 Working state

Information generated during the task that must survive across turns.

Examples:

- current plan;
- completed steps;
- unresolved failures;
- hypotheses;
- selected architecture;
- files changed;
- verification still required.

### 5.5 Execution feedback

Information returned by tools and the environment.

Examples:

- compiler diagnostics;
- test output;
- stack traces;
- shell output;
- tool errors.

Execution feedback often has high short-term value and low long-term value. Raw results are strong candidates for later trimming after durable conclusions have been recorded.

---

## 6. Context Composition as an Optimization Problem

For a reasoning step, imagine a large set of candidate information `C`.

The agent needs some subset `A ⊆ C` as active context.

A useful conceptual objective is:

```text
maximize:
    task-relevant information
    + required constraints
    + decision evidence
    + recoverable working state

while minimizing:
    irrelevant tokens
    + duplicated information
    + stale information
    + ambiguity
    + contradictory guidance
    + cost
    + latency
```

This is not a literal formula that must be implemented. It is a design lens.

The central mistake is treating `C` and `A` as if they should be identical.

---

## 7. Context Loading Strategies

### 7.1 Static preload

All likely useful information is loaded before reasoning begins.

**Advantages**

- minimal retrieval latency during execution;
- simple implementation;
- useful for small, stable information sets.

**Disadvantages**

- grows poorly with knowledge size;
- consumes tokens regardless of relevance;
- encourages stale duplicated state;
- makes instruction conflicts harder to understand.

**the platform position:** appropriate for small, stable, frequently required material.

### 7.2 Retrieval before inference

A retrieval system selects information before the model reasons.

Typical pipeline:

```text
request
  ↓
query construction
  ↓
lexical / semantic retrieval
  ↓
optional reranking
  ↓
selected documents
  ↓
model
```

This remains useful for large knowledge stores and predictable information needs.

### 7.3 Just-in-time agent retrieval

The model receives lightweight references and tools that allow it to discover information while working.

Examples:

```text
list directory
inspect package
search identifier
open relevant file
run dependency query
```

This enables progressive disclosure and allows each observation to guide the next retrieval action.

**Tradeoff:** the system spends additional tool calls and latency to avoid loading unnecessary information.

### 7.4 Hybrid context acquisition

The likely default for sophisticated agents is a combination:

```text
small stable base context
        +
pre-inference retrieval
        +
on-demand tool discovery
        +
structured task memory
        +
periodic compaction
```

the platform currently considers hybrid acquisition the most promising general architecture, while leaving implementation details workload-dependent.

---

## 8. Progressive Disclosure

Progressive disclosure means exposing detailed context only after the agent determines that it is relevant.

A coding agent might initially receive:

```text
Task
Repository-level instructions
Available skill names/descriptions
Available tool names/descriptions
```

Then discover:

```text
repo structure
  ↓
relevant project
  ↓
relevant files
  ↓
relevant skill
  ↓
relevant standards
  ↓
implementation details
```

This is preferable to preloading the entire repository, handbook, skill library, and tool documentation.

OpenAI's current Skill model follows this pattern: the harness can expose skill name, description, and path first; the agent loads the full `SKILL.md` and supporting resources when the skill is selected.

### Current recommendation

Use progressive disclosure when:

- the available knowledge set is large;
- only a subset will apply to a particular task;
- agents have reliable discovery mechanisms;
- retrieval latency is acceptable;
- context pollution is a greater risk than retrieval overhead.

Avoid unnecessary progressive disclosure when:

- the information is tiny;
- virtually every task requires it;
- retrieving it repeatedly would add more complexity than value.

---

## 9. Instructions at the Right Altitude

Instructions can fail in two opposite ways.

### Too low-level

```text
First call tool A.
Then inspect exactly three files.
Then call tool B.
If B returns X, call C.
...
```

This hardcodes behavior that a capable model may no longer need and can become brittle as tools or model capabilities change.

### Too high-level

```text
Write excellent secure code.
Use best practices.
```

This provides too little actionable guidance.

The useful middle layer describes:

- required outcomes;
- important constraints;
- authoritative sources;
- required verification;
- prohibited actions;
- decision criteria where they matter.

Current OpenAI guidance for newer coding models explicitly recommends revisiting accumulated `AGENTS.md`, skill, and task instructions because instructions added to compensate for older models can become unnecessary context as model capability improves.

### the platform recommendation

Instructions should encode **organizational intent and durable constraints**, not simulate a hand-written agent controller unless evidence shows that level of prescription is necessary.

---

## 10. Tools Are Context Interfaces

Tools are often discussed only as action mechanisms. They are also context-management mechanisms.

A good information tool allows an agent to acquire high-signal context with limited token cost.

Compare:

```text
read_entire_ci_log()
```

with:

```text
get_failed_jobs()
get_job_summary(jobId)
get_log_range(jobId, start, end)
```

The second interface allows progressive disclosure.

Tool outputs should therefore be evaluated partly on their **context efficiency**.

Desirable characteristics include:

- concise structured output;
- stable identifiers;
- pagination;
- filtering;
- summaries plus expansion mechanisms;
- clear error states;
- the ability to request additional detail without repeating the entire result.

This topic is expanded in the Tools and MCP section of the handbook.

---

## 11. Skills as Context Packages

A skill packages procedural knowledge and related resources for on-demand use.

the platform should treat a skill as a **discoverable context package**, not merely a stored prompt.

A skill may contain:

```text
SKILL.md
references/
examples/
templates/
scripts/
schemas/
evals/
```

The agent first needs enough metadata to determine whether the skill applies. Only then should the detailed content enter active context.

This structure supports the future the platform handbook-to-MCP model:

```text
handbook knowledge
      ↓
relevant standard/pattern
      ↓
skill discovery
      ↓
load task-specific procedure
      ↓
execute using tools
```

---

## 12. Repository Context for Coding Agents

Repository retrieval deserves special treatment because source code has properties that differ from ordinary prose.

Relevant relationships can be:

- lexical: exact symbol or filename;
- semantic: conceptually related behavior;
- structural: import/dependency relationship;
- execution-based: stack trace to implementation;
- historical: files commonly changed together;
- policy-based: repository instructions governing a subtree.

Recent repository-context research reinforces that no single retrieval mechanism dominates every coding task. Agent Retrieval Bench (2026) reports task-dependent winners across lexical methods, embedding retrieval, repository maps, and logged agent behavior, with substantial headroom remaining even when retrieval is improved.

### the platform implication

Do not prematurely standardize one universal repository retrieval strategy.

The likely architecture should support multiple signals and allow experiments to determine useful combinations.

---

## 13. Long-Horizon Context Management

Long-running agents eventually exceed practical active-context limits even when models support large windows.

Three major techniques are currently important.

### 13.1 Compaction

Summarize earlier history and continue using a compressed representation.

Advantages:

- straightforward;
- preserves conversational continuity;
- reduces active tokens.

Risks:

- subtle information may be permanently lost;
- summaries can distort earlier evidence;
- repeated compaction can compound errors.

### 13.2 Structured external memory

Persist important task state outside the context window.

Examples:

```text
TASK_STATE.md
DECISIONS.md
TODO.md
structured session state
artifact manifests
```

This gives the agent a durable source that can be reloaded after context resets.

### 13.3 Context isolation

Delegate bounded work into separate contexts and return only summarized results.

Subagents can be useful for context isolation even when specialization is not otherwise required.

Example:

```text
primary agent
   ├── repository investigation subagent
   ├── documentation research subagent
   └── test-failure analysis subagent

Each returns a compact result rather than its entire trajectory.
```

This can reduce context pollution but adds model calls, orchestration, cost, and potential information loss at the handoff boundary.

### the platform position

Compaction, durable external state, and context isolation are tools—not defaults. Their value depends on task horizon and workload.

---

## 14. Prefer Recoverable Context Over Irreversible Loss

An important emerging architectural principle is:

> Keep raw history recoverable whenever practical, even if it is not active.

For example, instead of:

```text
raw history
  ↓
summarize
  ↓
delete raw history
```

prefer:

```text
raw durable event history
      │
      ├── compact active summary
      └── selective retrieval when needed
```

This allows future reasoning steps to revisit information whose importance was not obvious during the original compaction step.

Durable storage and active context management should therefore be separate concerns.

---

## 15. Prompt and Context Caching

Context optimization is not only about reducing token count. Stable context can also be structured to improve caching.

OpenAI prompt caching currently operates on reusable prompt prefixes and can reduce both input cost and latency when the same stable prefix is reused. Current guidance recommends keeping stable instructions and tool definitions in stable prefix positions while allowing task-specific material to vary later.

### the platform implication

Context organization should consider both:

- semantic usefulness; and
- cache stability.

However, caching should not justify loading large irrelevant context solely because cached input is cheaper. Cheap irrelevant context is still irrelevant context.

---

## 16. Context Provenance and Authority

Not all context has equal authority.

An agent might simultaneously see:

```text
system policy
the platform standard
project standard
repository instruction
source-code comment
web page
issue description
compiler output
```

These are different categories of information.

The system should preserve enough provenance to distinguish:

- instruction from evidence;
- trusted from untrusted input;
- current from stale information;
- organization policy from repository convention;
- observed fact from generated summary.

Retrieval must not accidentally elevate an untrusted document into a high-authority instruction.

Context engineering and security engineering therefore overlap directly.

---

## 17. Context Failure Modes

### 17.1 Context dumping

Supplying everything that might be useful because the model has a large context window.

**Consequence:** cost, distraction, ambiguity, reduced traceability.

### 17.2 Instruction accretion

Continuously adding instructions after every failure without removing obsolete ones.

**Consequence:** contradictory and overly prescriptive agent behavior.

### 17.3 Stale environment descriptions

Encoding repository or infrastructure state into long-lived instructions.

**Consequence:** agents operate on outdated facts.

### 17.4 Tool-output flooding

Keeping large raw tool outputs in active history indefinitely.

**Consequence:** diagnostic noise dominates useful state.

### 17.5 Premature compaction

Summarizing before enough information exists to know what will matter later.

**Consequence:** irreversible loss of task-critical details.

### 17.6 Lossy handoff

A subagent or previous session returns a summary that omits evidence needed downstream.

**Consequence:** the receiving agent cannot reconstruct the reasoning basis.

### 17.7 Retrieval without abstention

A retrieval layer always returns something even when no result is actually relevant.

**Consequence:** plausible but irrelevant evidence contaminates reasoning.

### 17.8 Hidden precedence

Multiple instruction sources exist without explicit authority ordering.

**Consequence:** inconsistent behavior and difficult debugging.

### 17.9 Context as policy bypass

Retrieved content or tool output is treated as instruction with higher authority than intended.

**Consequence:** prompt-injection and authority escalation risks.

---

## 18. Initial the platform Guidance

The following guidance is **recommended but not yet internally validated**.

### AEP-CTX-G001 — Maintain a small stable instruction core

Keep globally applicable policy and durable operating principles readily available. Avoid placing large domain-specific knowledge in permanent context.

### AEP-CTX-G002 — Separate durable storage from active context

Do not require every retained fact to remain in every inference.

### AEP-CTX-G003 — Prefer authoritative discovery over copied state

Repository, infrastructure, API, and runtime facts should be obtained from authoritative sources when practical.

### AEP-CTX-G004 — Use progressive disclosure for large capability and knowledge sets

Expose enough metadata for discovery, then load detailed content only when it becomes relevant.

### AEP-CTX-G005 — Preserve provenance

Context should retain source, scope, authority, and freshness where those characteristics affect decisions.

### AEP-CTX-G006 — Treat tool output as temporary unless promoted into state

Large raw tool results should not remain active indefinitely. Important conclusions should be recorded in durable structured state before old output is trimmed.

### AEP-CTX-G007 — Prefer recoverable compaction

When possible, compact active context while preserving access to the underlying durable history.

### AEP-CTX-G008 — Do not assume one repository retrieval method is universally best

Support multiple retrieval signals and validate them against representative coding workloads.

### AEP-CTX-G009 — Revisit scaffolding as models improve

Instructions, orchestration, and context workarounds created for previous model generations should be periodically challenged and removed when no longer useful.

### AEP-CTX-G010 — Measure context behavior

Agent evaluation should capture context-related metrics such as retrieved items, active-token volume, cache usage, retrieval latency, repeated reads, irrelevant retrievals, compaction events, and downstream task success.

---

## 19. Recommended Context Architecture for Initial the platform Systems

The current default architecture should be approximately:

```text
┌─────────────────────────────────────┐
│ Stable instruction core             │
│                                     │
│ • authority model                   │
│ • core engineering principles       │
│ • repository navigation hints       │
│ • required verification             │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│ Discovery surface                   │
│                                     │
│ • skills metadata                   │
│ • tool metadata                     │
│ • repository identifiers            │
│ • knowledge indexes                 │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│ Just-in-time context acquisition    │
│                                     │
│ • file/search tools                 │
│ • retrieval + reranking             │
│ • handbook lookup                   │
│ • runtime inspection                │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│ Working state                       │
│                                     │
│ • plan                              │
│ • progress                          │
│ • decisions                         │
│ • unresolved issues                 │
└─────────────────┬───────────────────┘
                  │
          context pressure
                  │
                  ▼
┌─────────────────────────────────────┐
│ Context management                  │
│                                     │
│ • trim ephemeral results            │
│ • compact history                   │
│ • persist durable state             │
│ • recover old events when needed    │
└─────────────────────────────────────┘
```

This is a starting architecture, not a universal standard.

---

## 20. What We Should Measure

Initial context-engineering experiments should collect at least:

### Outcome

- task success;
- test success;
- required-file recall;
- patch correctness;
- human intervention.

### Context

- total input tokens;
- peak active-context size;
- unique files/documents loaded;
- duplicate context loaded;
- relevant-context precision;
- relevant-context recall;
- number of context-loading actions.

### Retrieval

- candidate count;
- final selected count;
- Recall@K;
- MRR or ranking metric where gold relevance exists;
- abstention quality.

### Cost and latency

- total model cost;
- cached input usage;
- retrieval cost;
- reranker cost;
- wall-clock latency;
- time to first useful action.

### Behavior

- repeated reads;
- dead-end searches;
- unnecessary tool calls;
- compaction events;
- post-compaction regressions;
- context-reset recovery failures.

---

## 21. Experiment Proposals Generated by This Chapter

### EXP-CTX-002 — Progressive Disclosure vs Static Context

Compare coding-task performance when relevant organizational and repository knowledge is:

1. preloaded into context; or
2. exposed through lightweight discovery and loaded on demand.

Primary metrics: task success, input tokens, latency, unnecessary context, tool calls.

### EXP-CTX-003 — Context Size vs Task Success

Hold task and model constant while varying relevant and irrelevant context volume.

Primary objective: identify whether larger context causes measurable quality degradation or merely cost/latency growth for representative tasks.

### EXP-CTX-007 — Compaction Strategies

Compare:

- raw rolling history;
- simple summarization;
- structured state extraction;
- summary plus recoverable event history.

Measure long-horizon correctness and recovery after old information becomes relevant again.

### EXP-SKILL-001 — Static Instructions vs Progressive Skill Loading

Compare large repository instruction files against lightweight skill discovery with on-demand loading.

Measure task success, context usage, skill-selection accuracy, latency, and instruction-following failures.

### Proposed new experiment: EXP-CTX-008 — Durable History With Selective Recall

Compare irreversible compacted history against compacted active context backed by recoverable raw event history.

Measure recovery when later task steps require details that were not selected into the original summary.

### Proposed new experiment: EXP-CTX-009 — Stable Prefix and Cache-Aware Context Layout

Compare equivalent context arranged with stable versus frequently changing prefixes.

Measure prompt-cache hit rate, latency, and input cost without changing semantic task quality.

---

## 22. Open Questions

This chapter leaves several questions intentionally unresolved:

1. What percentage of an agent's context should be stable versus task-derived?
2. How accurately can agents decide what information to retrieve themselves?
3. When does pre-inference retrieval outperform agentic exploration?
4. How should retrieval quality be evaluated when there is no single gold context set?
5. How should code graphs, lexical search, embeddings, history, and runtime evidence be combined?
6. What information should be promoted from ephemeral tool output into durable task state?
7. How much information is lost during repeated compaction?
8. When is a subagent justified solely for context isolation?
9. How should confidence or abstention operate in retrieval systems?
10. How should context systems handle contradictory information from different scopes?
11. How aggressively should context layout optimize prompt caching?
12. Which assumptions become obsolete as model capability improves?

---

## 23. Relationship to Future Chapters

AEP-CTX-001 defines the mental model. Subsequent documents should deepen individual mechanisms rather than repeat these fundamentals.

Planned sequence:

```text
AEP-CTX-001 Context Engineering Fundamentals
AEP-CTX-002 Context Sources and Instruction Hierarchy
AEP-CTX-003 Retrieval Architecture
AEP-CTX-004 Embeddings and Semantic Retrieval
AEP-CTX-005 Lexical and Hybrid Retrieval
AEP-CTX-006 Reranking
AEP-CTX-007 Progressive Disclosure
AEP-CTX-008 Context Compression and Compaction
AEP-CTX-009 Working Memory and Persistent Memory
AEP-CTX-010 Repository Context and Code Intelligence
AEP-CTX-011 Context Caching
AEP-CTX-012 Context Failure Modes
```

---

## 24. Current Conclusion

Context engineering should be treated as the design of an agent's **information lifecycle**.

The relevant question is not:

> How much information can the model accept?

It is:

> What information should be active now, what should remain discoverable, what must be retained durably, and what can safely be discarded?

For software-development agents, the platform's initial position is that strong systems will usually combine a small durable instruction core, authoritative environment tools, multiple retrieval signals, progressive disclosure, structured working state, and recoverable long-horizon history.

This position is externally well supported but still requires workload-specific the platform validation.

---

## References

### REF-ANTHROPIC-CONTEXT-2025
Anthropic, **Effective context engineering for AI agents**, September 29, 2025.  
https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

### REF-ANTHROPIC-MANAGED-AGENTS-2026
Anthropic, **Scaling Managed Agents: Decoupling the brain from the hands**, April 8, 2026.  
https://www.anthropic.com/engineering/managed-agents

### REF-OPENAI-SKILLS-2026
OpenAI Developers, **Skills**. Accessed September 30, 2026.  
https://developers.openai.com/api/docs/guides/tools-skills

### REF-OPENAI-PROMPT-CACHING-2026
OpenAI Developers, **Prompt caching**. Accessed September 30, 2026.  
https://developers.openai.com/api/docs/guides/prompt-caching

### REF-OPENAI-GPT6-SKILLS-2026
OpenAI Developers, **Rethinking skills and prompts for GPT-6 Astra**, September 11, 2026.  
https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra

### REF-ARB-2026
Qin, Bowen and Yi Xie, **Agent Retrieval Bench: Evaluating Repository Context Retrieval for Coding Agents**, July 27, 2026.  
https://arxiv.org/abs/2607.24882

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-context.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
- [HARNESS-FOUNDATIONS-03-CONTEXT-AND-STATE — Context engineering, retrieval, memory, and durable state](../../harness/foundations/03-context-and-state.md)
