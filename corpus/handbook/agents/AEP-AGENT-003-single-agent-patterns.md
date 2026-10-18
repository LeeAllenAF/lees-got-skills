---
schema_version: '1.0'
id: AEP-AGENT-003
title: Single-Agent Patterns
summary: 'Single-Agent Patterns. Focus: single agent, tool use.'
type: pattern
status: recommended
version: 0.1.0
collection: handbook
domains:
- agent-architecture
tags:
- single-agent
- tool-use
scope:
- enterprise-global
related:
- AEP-AGENT-001
- AEP-TOOL-004
- AEP-CTX-007
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/agents/AEP-AGENT-003-single-agent-patterns.md
  original_sha256: 560eb59119c05c30845ebc1d5617d07b31fe8f7cb2d0e63ae2302b4bb07a2232
  original_metadata_record: handbook/agents/AEP-AGENT-003-single-agent-patterns.md
  authority: inherited-source-context
---
# AEP-AGENT-003 — Single-Agent Patterns

## Purpose
Define the preferred baseline architecture before introducing multiple agents.

## Common patterns
### ReAct-style loop
The agent reasons from current evidence, acts through tools, observes results, and adapts.

### Tool-using specialist
One stable agent owns the task with a narrow domain and tool set.

### Agent inside a deterministic workflow
The surrounding application owns control flow while the agent resolves ambiguous steps.

### Long-running workspace agent
One agent maintains task state across many actions, often with compaction, working memory, and sandboxed execution.

## When single-agent systems work well
- tools are understandable and bounded;
- one context can support the task;
- authority is uniform;
- dependencies between steps are high;
- one owner should synthesize the final result.

## Pressure signals for splitting
Wrong-tool selection, incompatible policy surfaces, overloaded context, independent parallel tasks, or repeated need for truly distinct models/output contracts may justify decomposition.

## Guidance
Before splitting, try improving tool descriptions, context disclosure, deterministic routing, and tool scope. Multi-agent structure should solve an observed failure, not an anticipated aesthetic problem.

## References
- OpenAI, Running agents — https://developers.openai.com/api/docs/guides/agents/running-agents
- Google Cloud, Agentic AI design patterns — https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-agents.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-AGENT-001 — Agent Architecture Fundamentals](AEP-AGENT-001-agent-architecture-fundamentals.md)
- [AEP-TOOL-004 — Tool Discovery and Capability Loading](../tools/AEP-TOOL-004-tool-discovery-and-capability-loading.md)
- [AEP-CTX-007 — Progressive Disclosure](../context/AEP-CTX-007-progressive-disclosure.md)
- [HARNESS-CODEX-SDK-01-SDK-FOUNDATIONS — Codex TypeScript SDK foundations](../../harness/codex-sdk/01-sdk-foundations.md)
