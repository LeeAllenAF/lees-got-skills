---
schema_version: '1.0'
id: AEP-CTX-007
title: Progressive Disclosure
summary: 'Progressive Disclosure. Focus: context engineering, progressive disclosure.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- context-engineering
tags:
- context-engineering
- progressive-disclosure
scope:
- enterprise-global
- software-development-agents
related:
- AEP-CTX-001
- AEP-CTX-002
- AEP-CTX-003
- AEP-CTX-006
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 180d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/context/AEP-CTX-007-progressive-disclosure.md
  original_sha256: 6c27342064f162612182e3f3cc846c4077f616923529de52783cec38254945e9
  original_metadata_record: handbook/context/AEP-CTX-007-progressive-disclosure.md
  authority: inherited-source-context
---

# AEP-CTX-007 — Progressive Disclosure

## 1. Summary

Progressive disclosure is the practice of exposing only enough information for an agent to determine the next useful action, while keeping deeper instructions, references, tools, and supporting material discoverable on demand.

The objective is not to make context small for its own sake. The objective is to keep **active context relevant, authoritative, and economical** while preserving access to a much larger body of knowledge and capability.

the platform currently recommends progressive disclosure as the default design pattern for large reusable instruction sets, skills, repository guidance, tool catalogs, and organizational knowledge.

The default should be:

```text
small stable core
      ↓
capability metadata
      ↓
agent selects relevant capability
      ↓
load focused instructions
      ↓
retrieve supporting references as needed
      ↓
execute and verify
```

rather than:

```text
load every rule
load every skill
load every tool description
load every reference
load every repository convention
      ↓
ask the model to ignore what does not matter
```

## 2. Why Progressive Disclosure Matters

Every item placed in active model context competes for attention with the task itself.

Additional context can provide useful information, but it can also introduce:

- irrelevant instructions;
- conflicting instructions;
- stale guidance;
- duplicated information;
- increased token cost;
- earlier compaction;
- slower processing;
- retrieval noise;
- greater attack surface for untrusted content;
- increased difficulty determining which instruction actually applies.

Modern agent systems therefore increasingly separate **discovery metadata** from **full capability content**.

OpenAI's current Agent Skills implementation exposes each available skill's name, description, and path so the model can discover the skill before loading its full `SKILL.md` and supporting resources. OpenAI's September 2026 guidance also explicitly recommends progressive disclosure within skills and warns that reading unnecessary skill material consumes context and can force earlier compaction.

Anthropic's Skills architecture follows the same broad pattern: lightweight metadata is available first, the main skill body is loaded when relevant, and additional supporting files can be read only when required. Anthropic's context-engineering guidance similarly describes progressive disclosure as agents incrementally discovering relevant context through exploration rather than receiving exhaustive information upfront.

These implementations provide strong external evidence that progressive disclosure is no longer merely a prompt-writing technique. It is an architectural pattern for context management.

## 3. Progressive Disclosure Is Not Lazy Loading Alone

Progressive disclosure is sometimes described as "lazy loading for prompts." That analogy is useful but incomplete.

The design has at least four responsibilities:

1. **Discovery** — the agent must know that useful information or capability exists.
2. **Selection** — the agent must determine when that capability is relevant.
3. **Expansion** — the system must load the appropriate detail when selected.
4. **Retention** — the system must decide what remains active after the information has served its purpose.

A system that defers loading but provides poor discovery metadata can fail because the agent never realizes the required knowledge exists.

A system that discovers correctly but never releases obsolete material can still accumulate context bloat.

Progressive disclosure is therefore a **context lifecycle pattern**, not merely a file-loading optimization.

## 4. The the platform Disclosure Model

the platform should distinguish at least four levels of disclosure.

### Level 0 — Governing Context

Information that should normally remain available throughout the task.

Examples:

- system-level safety constraints;
- agent identity and operating contract;
- high-level repository instructions;
- authority boundaries;
- task objective;
- critical scoped requirements;
- compact pointers to available knowledge and capabilities.

This layer should remain deliberately small.

### Level 1 — Discovery Metadata

Compact information telling the agent what additional capabilities or knowledge exist.

Examples:

```yaml
name: postgres-migration
description: >-
  Create, review, and validate PostgreSQL schema migrations.
  Use when adding or modifying database migrations or planning rollout.
path: skills/postgres-migration/
```

Other examples include:

- skill names and descriptions;
- MCP server capability summaries;
- repository directory summaries;
- handbook document metadata;
- tool categories;
- knowledge-base indexes;
- available reference collections.

The purpose of Level 1 is **routing**, not teaching.

### Level 2 — Operational Guidance

Instructions required to perform the selected activity.

Examples:

- `SKILL.md`;
- migration procedure;
- React component conventions;
- deployment workflow;
- security-review checklist;
- scope-specific implementation requirements.

This material enters active context only when its capability applies.

### Level 3 — Supporting Evidence and Deep Reference

Large or highly specific resources consulted only when required.

Examples:

- detailed API references;
- example migrations;
- architectural diagrams;
- full ADRs;
- vendor documentation;
- historical experiment results;
- troubleshooting playbooks;
- generated repository maps;
- complete schema descriptions.

Level 3 material should normally be retrieved selectively rather than loaded wholesale.

## 5. Disclosure as a Funnel

The model can be represented as:

```text
                    Governing context
                         small
                          │
                          ▼
                  discovery metadata
                          │
                  ┌───────┴───────┐
                  ▼               ▼
             capability A     capability B
                  │
                  ▼
             operational
              guidance
                  │
          ┌───────┴────────┐
          ▼                ▼
      reference       reference
         A1               A2
```

The number of available resources may be large while the active working set remains relatively small.

This is a key architectural property: **the total knowledge available to an agent need not equal the knowledge occupying its context window.**

## 6. Repository Instructions

Repository-level instruction files should function primarily as stable routing and policy layers.

They should contain information such as:

- how the repository is organized;
- mandatory commands;
- hard constraints;
- verification expectations;
- authoritative sources of further guidance;
- how to discover project-specific instructions;
- security and authority boundaries.

They should generally avoid embedding:

- complete framework tutorials;
- every coding convention used by the organization;
- large API references;
- rarely used operational procedures;
- extensive historical rationale;
- duplicated vendor documentation.

A repository instruction file should help answer:

> What environment am I in, what rules always matter here, and where should I look next?

It should not try to answer every possible question the agent may encounter.

## 7. Skills

Skills are a natural progressive-disclosure boundary.

A skill should expose enough metadata for reliable selection without forcing its full contents into context.

Recommended structure:

```text
skills/
  postgres-migration/
    SKILL.md
    references/
      rollback.md
      zero-downtime.md
      prisma.md
    scripts/
      validate-migration.sh
    templates/
      migration-plan.md
    evals/
```

The root `SKILL.md` should usually remain a focused operational router.

It should explain:

- when to use the skill;
- when not to use it;
- required preconditions;
- high-level workflow;
- mandatory verification;
- relevant supporting files;
- approval boundaries.

Detailed reference information should live in supporting material that can be read selectively.

### Anti-pattern: The Giant Skill

```text
SKILL.md
  8,000 lines
  every possible workflow
  every API reference
  every troubleshooting case
  every example
```

This undermines the purpose of skills by turning activation into a large context injection.

### Preferred pattern

```text
SKILL.md
  concise workflow + routing

references/
  migration-design.md
  rollback.md
  prisma.md
  postgres-locking.md
```

The skill tells the agent **where to look**, not everything it could ever know.

## 8. Tools and Progressive Disclosure

Tool availability also consumes context because agents need enough description to understand which tools exist and when to call them.

Large static tool catalogs can therefore become another form of context bloat.

Tool systems should support some combination of:

- compact tool descriptions;
- capability grouping;
- dynamic discovery;
- contextual tool registration;
- scoped MCP servers;
- cached capability catalogs;
- task-specific tool exposure.

The July 2026 MCP specification strengthens this architecture by making discovery optional and list responses cacheable. Clients can retrieve server capabilities when needed and cache tool/resource catalogs according to server-provided freshness hints.

This enables a useful pattern:

```text
agent knows:
  "repository tools are available"

        ↓
needs repository operation

        ↓
discover repository capabilities

        ↓
load relevant tool definitions

        ↓
call selected tool
```

However, discovery itself has cost. Systems should not rediscover stable capabilities repeatedly when safe caching or static registration is more efficient.

## 9. Knowledge Bases and Handbook Retrieval

The the platform handbook should use the same pattern.

The future knowledge service should avoid returning complete chapters unless explicitly requested.

Instead:

```text
task
  ↓
resolve applicable knowledge domains
  ↓
return compact guidance summaries + provenance
  ↓
agent requests deeper guidance if needed
  ↓
retrieve specific sections / experiments / references
```

A future response might initially contain:

```yaml
applicable_guidance:
  - id: AEP-CTX-007
    title: Progressive Disclosure
    status: recommended
    summary: Load reusable guidance only when task relevance is established.

  - id: AEP-SEC-004
    title: Tool Authority Boundaries
    status: approved
    summary: Production write access requires explicit approval.
```

The agent can then request the complete section only when required.

This is preferable to injecting the entire handbook into every task.

## 10. Discovery Metadata Is an Interface

Metadata quality becomes extremely important in progressive systems.

Poor description:

```yaml
name: database
description: Helps with databases.
```

Better description:

```yaml
name: postgres-migration
description: >-
  Create, modify, review, and validate PostgreSQL schema migrations.
  Use for migration files, rollout planning, rollback design, lock-risk
  analysis, and schema-change verification. Do not use for ordinary query
  optimization or application-level database access.
```

The second version improves both positive and negative routing.

Good discovery metadata should communicate:

- what capability exists;
- when it applies;
- when it does not apply;
- important boundaries;
- where deeper material lives.

Metadata should be treated as a **machine-facing API contract**, not merely documentation.

## 11. Agent-Directed Exploration

Progressive disclosure does not require centralized retrieval for every decision.

Agents with filesystem, search, and shell capabilities can often discover context effectively through exploration.

For example:

```text
inspect repository root
      ↓
read package.json
      ↓
identify Nx workspace
      ↓
query Nx project graph
      ↓
inspect target project
      ↓
load framework-specific skill
      ↓
read only affected files
```

This can outperform prematurely retrieving large amounts of repository context.

However, exploration can also become inefficient.

Failure modes include:

- repeatedly inspecting the same locations;
- following irrelevant directory trees;
- reading excessively large files;
- missing important but non-obvious sources;
- using many tool calls where indexed retrieval would have been cheaper;
- failing to record discoveries for later steps.

Progressive disclosure therefore works best when agents have **good navigation affordances and stopping heuristics**.

## 12. Push vs Pull Context

Context can enter the agent through two broad mechanisms.

### Push

The harness automatically supplies information.

Useful for:

- governing instructions;
- hard policy;
- task objective;
- critical environment state;
- compact capability metadata.

### Pull

The agent requests additional information.

Useful for:

- detailed skills;
- repository files;
- external documentation;
- historical decisions;
- rare procedures;
- deep references.

the platform should prefer:

```text
push what is always necessary
pull what is conditionally useful
```

Too much push creates noise.

Too much pull creates discovery overhead and increases the chance that required information is never retrieved.

The correct boundary should be evaluated by workload.

## 13. Progressive Disclosure and Security

Progressive disclosure can improve security when it also limits authority and exposure.

Examples:

- production tools are not registered until a production operation is explicitly required;
- credentials are unavailable until an approved workflow requests them;
- scope-specific knowledge is not discoverable outside the permitted scope;
- write-capable MCP servers are absent from read-only research tasks;
- dangerous operational instructions are loaded only inside authorized workflows.

However, progressive disclosure is **not a security boundary by itself**.

If an agent can freely discover and activate every sensitive capability, hiding the description initially does not meaningfully restrict authority.

Security must still be enforced through authorization, sandboxing, tool permissions, network controls, credential boundaries, and approvals.

## 14. Context Retention After Disclosure

Loading information on demand solves only half the problem.

A long-running agent may eventually accumulate every disclosed item anyway.

The system therefore needs retention rules.

Possible approaches include:

- retain while the associated task phase is active;
- retain only a compact summary;
- move detailed material back to retrievable state;
- preserve a structured pointer rather than raw content;
- retain immutable decisions while dropping exploratory evidence;
- rely on prompt caching for stable prefixes where appropriate;
- compact completed subtask histories.

Example:

```text
Database migration skill loaded
        ↓
migration implemented + verified
        ↓
retain:
  - migration decision
  - verification result
  - relevant file paths

discard from active context:
  - full migration tutorial
  - unused examples
  - transient command output
```

This concept should be developed further in AEP-CTX-008 and AEP-CTX-009.

## 15. Progressive Disclosure Failure Modes

### 15.1 Over-disclosure

Too much material is loaded before relevance is established.

Symptoms:

- large initial prompts;
- unnecessary skills loaded for every request;
- giant tool catalogs;
- early compaction;
- conflicting guidance.

### 15.2 Under-disclosure

Critical information exists but the agent does not know to retrieve it.

Symptoms:

- ignored standards;
- repeated mistakes;
- invention of unavailable procedures;
- incorrect assumptions about repository behavior.

### 15.3 Bad Discovery Metadata

Capabilities exist but their descriptions are vague, overlapping, or misleading.

### 15.4 Disclosure Cascades

Selecting one capability automatically loads many additional resources regardless of need.

Example:

```text
load AWS skill
   ↓
loads IAM + EKS + Lambda + SQS + RDS + Terraform + CloudWatch docs
```

This recreates static context bloat under a different name.

### 15.5 Permanent Accumulation

Resources are progressively loaded but never removed or compacted.

### 15.6 Retrieval Without Authority Awareness

Relevant information is retrieved even though the current task or identity should not have access to it.

Authorization must occur before relevance ranking.

### 15.7 Excessive Discovery Calls

An agent repeatedly enumerates stable skills or tools instead of using cached capability information.

### 15.8 Over-engineered Routing

Complex classifiers and routing models are introduced for cases where a short list of clearly described capabilities would allow the primary agent to select reliably.

## 16. When Eager Loading Is Better

Progressive disclosure should not become dogma.

Eager loading is appropriate when information is:

- small;
- frequently required;
- safety-critical;
- necessary to correctly interpret all later context;
- difficult to discover reliably;
- stable throughout the session.

Examples include:

- authority constraints;
- repository build commands;
- mandatory verification requirements;
- a small project-specific style rule;
- task objective.

Loading a 200-token invariant every time may be better than spending a tool call to rediscover it.

The decision should consider:

```text
size × frequency × importance × discovery cost × failure consequence
```

## 17. A Practical Disclosure Budget

the platform should eventually define workload-specific budgets, but a useful qualitative model is:

### Always active

Only material that is broadly applicable and high consequence.

### Discoverable metadata

Enough information to route confidently.

### Active working set

Material required for the current phase of work.

### Externalized state

Important information preserved outside active context.

### Recoverable archive

Detailed history or references available if needed later.

Conceptually:

```text
                      total available knowledge
                               huge
                                │
                         recoverable archive
                                │
                         externalized state
                                │
                       active working context
                                │
                         governing context
                               small
```

## 18. Recommended platform Pattern

For coding agents, the current recommended baseline is:

```text
1. Load governing policy and task objective.

2. Load compact repository guidance.

3. Expose capability metadata for available skills/tools.

4. Let the agent inspect the environment and identify task class.

5. Load only relevant skills.

6. Retrieve task-specific knowledge and repository context.

7. Execute using deterministic tools where possible.

8. Preserve decisions and verification state.

9. Compact or release detailed context after the corresponding phase.

10. Reload deeper references when later evidence requires them.
```

## 19. Relationship to `AGENTS.md`

For the platform repositories, `AGENTS.md` should generally operate as a **bootstrap and routing layer**.

Recommended responsibilities:

```text
AGENTS.md
├── repository identity
├── permanent constraints
├── build/test/lint entry points
├── authority restrictions
├── project-discovery guidance
├── available skill locations
└── pointers to deeper standards
```

Avoid turning `AGENTS.md` into:

```text
the platform engineering handbook
+ React handbook
+ AWS handbook
+ security handbook
+ deployment handbook
+ project history
+ troubleshooting encyclopedia
```

This distinction is especially important because improvements in model capability can make old scaffolding unnecessary. OpenAI's September 2026 guidance explicitly recommends revisiting accumulated skill and `AGENTS.md` instructions rather than retaining complexity written to compensate for earlier model limitations.

## 20. Relationship to MCP

A future the platform MCP knowledge service should support progressive disclosure natively.

Potential capability flow:

```text
server/discover
      ↓
knowledge domains
      ↓
resolve_guidance(task, scope)
      ↓
compact applicable guidance
      ↓
get_guidance(id, section?)
      ↓
get_reference(id)
```

This is preferable to a single tool such as:

```text
search_everything(query)
```

because the knowledge service should understand provenance, authority, scope, maturity, and applicability—not merely textual similarity.

## 21. Evaluation

Progressive disclosure should be evaluated end-to-end rather than only by token count.

Relevant metrics include:

### Quality

- task success;
- standards compliance;
- missed required guidance;
- incorrect skill selection;
- unsafe actions.

### Efficiency

- input tokens;
- context occupancy over time;
- compaction frequency;
- number of files/resources read;
- discovery tool calls;
- latency;
- cost.

### Behavioral quality

- unnecessary skill activations;
- repeated resource reads;
- relevant resources never discovered;
- irrelevant context retained after use.

A system that saves tokens but frequently misses critical instructions is not successful.

## 22. Initial the platform Guidance

### AEP-CTX-007-G01

**Status:** Recommended

Large reusable knowledge sets should use progressive disclosure rather than unconditional context injection.

### AEP-CTX-007-G02

**Status:** Recommended

Discovery metadata should be treated as an engineered routing interface and explicitly state applicability boundaries.

### AEP-CTX-007-G03

**Status:** Recommended

Repository instruction files should contain permanent constraints and routing information rather than attempting to encode the entire organizational knowledge base.

### AEP-CTX-007-G04

**Status:** Recommended

Skills should use a compact root instruction document and place scenario-specific detail in supporting resources.

### AEP-CTX-007-G05

**Status:** Recommended

Progressive disclosure systems must include retention/compaction behavior; lazy loading without release eventually recreates context bloat.

### AEP-CTX-007-G06

**Status:** Recommended

Security-sensitive capabilities should combine disclosure controls with real authorization and authority boundaries. Hidden capability metadata is not itself a security control.

### AEP-CTX-007-G07

**Status:** Provisional

Tool and skill catalogs should be dynamically scoped when their full static descriptions become a material portion of active context.

Validation required: EXP-CTX-020.

### AEP-CTX-007-G08

**Status:** Provisional

Skill root documents should primarily route to deeper resources rather than contain exhaustive guidance.

Validation required: EXP-SKILL-001 and EXP-CTX-021.

## 23. Experiment Proposals

### EXP-CTX-002 — Progressive Disclosure vs Static Context

Already present in the experiment backlog.

Compare equivalent coding tasks under:

1. all applicable documentation loaded initially;
2. compact metadata + agent-selected retrieval;
3. task-classification + deterministic preselection;
4. hybrid agent/deterministic disclosure.

Measure task success, context size, total input tokens, compaction frequency, cost, latency, missed guidance, and unnecessary context.

### EXP-CTX-020 — Static vs Dynamically Scoped Capability Catalogs

**Hypothesis:** Dynamically exposing only task-relevant tool and skill metadata reduces context usage and selection errors without materially increasing discovery latency.

Compare:

- full static capability catalog;
- category-level discovery;
- task-classified catalog;
- agent-initiated capability discovery.

### EXP-CTX-021 — Skill Router Depth

**Hypothesis:** A compact skill root document that routes to supporting files will outperform an exhaustive monolithic skill once skill complexity crosses a workload-dependent threshold.

Vary:

- monolithic `SKILL.md`;
- root + one reference layer;
- root + hierarchical references;
- automatically retrieved references.

Measure:

- task success;
- missed instructions;
- active tokens;
- files read;
- total model tokens;
- latency;
- compaction frequency.

## 24. Open Questions Generated by This Chapter

### Q-CTX-008

What information should always remain active even when progressive disclosure is available?

### Q-CTX-009

What quality of metadata is required for reliable autonomous capability selection?

### Q-CTX-010

At what catalog size does dynamic tool/skill discovery outperform static registration?

### Q-CTX-011

How should disclosed context be retired, summarized, or externalized after its task phase completes?

### Q-SKILL-004

What is the optimal depth of a skill's internal progressive-disclosure hierarchy?

### Q-TOOL-006

Should capability discovery be driven primarily by the agent, deterministic task classification, or a hybrid of the two?

## 25. Current Evidence

### OpenAI — Agent Skills

Current OpenAI documentation describes skills as directories containing a `SKILL.md` manifest and supporting resources. In Agents API sessions, discovered skill names and descriptions are added to context; the model can then select a relevant skill and read its full instructions and supporting files.

Source: https://developers.openai.com/api/docs/guides/tools-skills

### OpenAI — Rethinking Skills and Prompts for GPT-6 Astra

OpenAI's September 11, 2026 guidance identifies progressive disclosure as a key property of useful skills and recommends making the root skill document a minimal router for larger workflows. It also recommends revisiting accumulated prompts and repository instructions as model capabilities improve.

Source: https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra

### Anthropic — Effective Context Engineering for AI Agents

Anthropic describes progressive disclosure as allowing agents to incrementally discover relevant context through exploration while maintaining only necessary information in working memory. It also notes the tradeoff between runtime exploration and precomputed retrieval.

Source: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

### Anthropic — Agent Skills

Anthropic's skill architecture uses metadata as a first disclosure layer, the main `SKILL.md` as a second layer, and supporting resources as additional layers that can be read only when necessary.

Source: https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills

### Model Context Protocol — 2026-07-28 Specification

The current MCP specification supports optional capability discovery and cacheable list/resource results, enabling clients to avoid repeatedly injecting or fetching complete capability catalogs while still discovering them when required.

Source: https://blog.modelcontextprotocol.io/posts/2026-07-28/

## 26. Current Conclusion

Progressive disclosure should be considered a foundational the platform context-engineering pattern.

The central principle is:

> **Make important capabilities discoverable before making their full contents active.**

This allows the system's available knowledge and capability surface to grow significantly without requiring the active context window to grow at the same rate.

The remaining engineering challenge is not whether progressive disclosure is useful, but **where to place the disclosure boundaries, how to make discovery reliable, and when the additional retrieval overhead stops being worthwhile.**

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-context.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-CTX-001 — Context Engineering Fundamentals](AEP-CTX-001-context-engineering-fundamentals.md)
- [AEP-CTX-002 — Context Sources and Instruction Hierarchy](AEP-CTX-002-context-sources-and-instruction-hierarchy.md)
- [AEP-CTX-003 — Retrieval Architecture](AEP-CTX-003-retrieval-architecture.md)
- [AEP-CTX-006 — Reranking](AEP-CTX-006-reranking.md)
- [HARNESS-FOUNDATIONS-03-CONTEXT-AND-STATE — Context engineering, retrieval, memory, and durable state](../../harness/foundations/03-context-and-state.md)
