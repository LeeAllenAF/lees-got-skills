---
schema_version: '1.0'
id: AEP-GLOSS-001
title: Agent Engineering Glossary
summary: 'Agent Engineering Glossary. Focus: glossary, knowledge management.'
type: reference
status: provisional
version: 0.1.0
collection: handbook
domains:
- engineering-foundations
tags:
- glossary
- knowledge-management
scope:
- enterprise-global
related: []
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 180d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/foundations/AEP-GLOSS-001-glossary.md
  original_sha256: a849bad704fd7c658677193a5362ae5b4c25683dc6a028422bddcd524b47262c
  original_metadata_record: handbook/foundations/AEP-GLOSS-001-glossary.md
  authority: inherited-source-context
---

# the platform Agent Engineering Glossary

This glossary establishes working meanings for overloaded terms. Definitions are intentionally provider-neutral unless explicitly noted.

## Agent

A software system in which a model can select or sequence actions in pursuit of a goal using context, state, tools, and environmental feedback. An agent is more than a single model invocation.

## Agent harness

The runtime and control layer surrounding a model that manages instructions, context, state, tool invocation, permissions, retries, budgets, tracing, and termination.

## Agentic workflow

A workflow containing one or more agent-controlled decisions or action loops. Not every workflow that uses an LLM is agentic.

## Autonomy

The degree to which a system may select and execute actions without contemporaneous human approval. Autonomy is distinct from authority.

## Authority

The actions and resources a system is permitted to access or modify. A highly autonomous agent can still have narrowly scoped authority.

## Context

The information available to a model for a specific inference or reasoning step, including instructions, messages, retrieved information, tool results, state, summaries, and other supplied data.

## Context engineering

The discipline of selecting, structuring, retrieving, transforming, prioritizing, and managing the information available to a model over the lifecycle of a task.

## Context window

The maximum model-visible token capacity for an invocation or session as defined by the model/runtime. Usable context quality is not equivalent to raw context-window size.

## Compaction

A process that reduces accumulated context while attempting to preserve information required for future task progress.

## Working memory

Short-lived state required to continue the current task or session. Working memory may be stored outside the model context and selectively reintroduced.

## Persistent memory

Information retained beyond the immediate task or session for possible use later. Persistent memory requires explicit decisions about scope, trust, freshness, retrieval, and deletion.

## Retrieval

The process of selecting potentially relevant information from an external corpus or data source for use by an agent or model.

## RAG

Retrieval-Augmented Generation. A broad pattern in which retrieved external information is supplied to a generative model. RAG is not synonymous with vector search.

## Lexical retrieval

Retrieval based on textual matching and term statistics, such as BM25. It is often strong for exact identifiers, symbols, names, and technical terms.

## Semantic retrieval

Retrieval based on learned semantic representations, commonly embeddings, intended to find conceptually related information even when exact words differ.

## Hybrid retrieval

A retrieval strategy that combines lexical and semantic approaches, usually followed by candidate merging and sometimes reranking.

## Embedding

A numerical representation of content in a vector space intended to preserve useful semantic or structural relationships for similarity search or related operations.

## Reranker

A model or algorithm that reorders a candidate set produced by an earlier retrieval stage using a more expensive or more precise relevance estimate.

## Chunk

A retrievable unit of content. Chunking strategy determines how documents, code, conversations, or other sources are divided for indexing and retrieval.

## Progressive disclosure

Providing information or capabilities only when the current task indicates they are needed rather than loading everything into context upfront.

## Tool

A callable capability exposed to an agent, usually with defined inputs, outputs, and authority. Examples include repository inspection, shell execution, database queries, or issue retrieval.

## Tool call

A single invocation of a tool by an agent or model.

## MCP

Model Context Protocol. A protocol for exposing tools, resources, prompts, and related capabilities to compatible AI clients. In the platform architecture, MCP is considered an interface rather than the canonical owner of organizational knowledge.

## Skill

A packaged, reusable capability that may include instructions, references, examples, templates, scripts, schemas, and evaluations. A skill should be scoped to a recognizable activity and support progressive disclosure where possible.

## Instruction

Authoritative guidance intended to influence agent behavior. Instructions should be distinguished from untrusted content that merely contains imperative language.

## Prompt

Text or structured content supplied to a model for an invocation. Prompts are one component of context, not the whole context-engineering discipline.

## System instruction

High-authority instruction supplied by the runtime or application to establish global behavior and constraints.

## Repository instruction

Stable guidance stored with a codebase or project to describe local conventions, commands, boundaries, and routing to deeper knowledge.

## State

Structured information representing relevant facts about the current workflow, environment, decisions, progress, or pending actions.

## Trace

A structured record of an agent run including model invocations, tool calls, transitions, errors, approvals, retries, state changes, timing, and related telemetry.

## Eval

A repeatable test or measurement used to assess agent or model behavior against defined criteria.

## Grader

A mechanism that scores or classifies an eval result. A grader may be deterministic, model-based, rule-based, or human.

## Benchmark

A standardized set of tasks or measurements intended to compare systems under controlled conditions. Benchmark results are meaningful only with sufficient detail about models, versions, environments, and methodology.

## Experiment

A controlled investigation designed to test a hypothesis or compare alternative approaches.

## Model routing

Selecting a model or mechanism based on characteristics such as task class, difficulty, cost, latency, risk, context requirements, or prior failures.

## Escalation

Moving from a lower-cost or lower-capability mechanism to a more capable one because evidence indicates that the current mechanism is insufficient.

## Frontier model

A model near the current state of the art in broad capability. The term is time-sensitive and should not be treated as a permanent model category tied to any vendor.

## Small model

A comparatively lower-cost, lower-latency model suited to bounded or high-volume tasks when its capability is sufficient. "Small" is relative and time-sensitive.

## Specialist model

A model optimized or selected for a narrower task class, such as embeddings, reranking, classification, speech, vision, or domain-specific processing.

## Planner/executor

An architecture that separates higher-level task planning from lower-level action execution. The roles may be separate agents, separate model calls, or explicit phases within one agent.

## Generator/critic

An architecture where one process produces an artifact and another critiques or evaluates it, often iteratively. The critic may be another model, the same model in a separate role, a deterministic validator, or a human.

## Subagent

An agent invoked by another agent or orchestrator to perform a scoped subtask, often with isolated context or authority.

## Orchestration

The coordination of models, agents, tools, state transitions, retries, handoffs, and workflow execution.

## Human in the loop

A workflow in which one or more steps require human input, review, approval, or decision before execution may continue.

## Human on the loop

A workflow in which a system can operate autonomously within limits while a human supervises, audits, or can intervene.

## Prompt injection

An attempt, intentional or accidental, for untrusted content to influence agent behavior as though it were authorized instruction.

## Least privilege

The principle of granting only the minimum permissions and authority necessary to perform the current task.

## Sandbox

An isolated execution environment intended to limit the impact of agent-executed code or actions.

## Provenance

Metadata describing where knowledge, guidance, evidence, or data came from, including source, version, scope, status, and lineage where relevant.

## Overlay

A scoped layer of guidance that augments or overrides more general knowledge, such as project-, repository-, or task-specific standards.

## Effective guidance

The resolved set of instructions, standards, recommendations, and constraints applicable to a specific task after relevant overlays and precedence rules are considered.

## Deterministic verification

Validation performed by a mechanism expected to produce the same result for the same input, such as compilation, schema validation, a unit test, or a static-analysis rule.

## Model-based verification

Validation performed by an LLM or other probabilistic model. Useful where deterministic checks cannot fully capture the requirement, but generally weaker than deterministic evidence for objectively testable properties.

## Agentic repair loop

A bounded cycle in which an agent executes work, observes environmental feedback or verification failures, diagnoses the issue, modifies the work, and verifies again.

## Budget

A limit on resources an agent may consume, such as model calls, tokens, time, tool calls, retries, money, or privileged actions.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-foundations.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [HARNESS-REFERENCE-GLOSSARY — Glossary](../../harness/reference/GLOSSARY.md)
