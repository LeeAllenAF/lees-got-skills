---
schema_version: '1.0'
id: AEP-EVAL-005
title: Trace and Trajectory Evaluation
summary: 'Trace and Trajectory Evaluation. Focus: observability, trace evaluation.'
type: pattern
status: recommended
version: 0.1.0
collection: handbook
domains:
- evaluation
tags:
- observability
- trace-evaluation
scope:
- enterprise-global
related:
- AEP-EVAL-001
- AEP-TOOL-009
- AEP-AGENT-010
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/evals/AEP-EVAL-005-traces-and-trajectory-evaluation.md
  original_sha256: ed08486540f9968ea1c7e8b47ab8281de431b61fb163d0ebe7000095a26bca23
  original_metadata_record: handbook/evals/AEP-EVAL-005-traces-and-trajectory-evaluation.md
  authority: inherited-source-context
---

# AEP-EVAL-005 — Trace and Trajectory Evaluation

## 1. Purpose
End-state success is necessary but insufficient for autonomous systems. Trace evaluation examines the path: decisions, model calls, tool calls, handoffs, approvals, retries, and context transitions.

## 2. What traces are for
Use traces to evaluate behaviors such as:
- correct tool selection;
- unnecessary tool/model calls;
- invalid or circular handoffs;
- approval bypasses;
- unsafe retries;
- context retrieval failures;
- escalation behavior;
- non-progress loops;
- excessive cost or latency.

## 3. Outcome vs trace
A trace grader should not replace end-state verification. An agent may follow a beautiful process and still fail the task, or succeed while violating authority constraints.

## 4. Trace schema
At minimum capture:
- task and configuration version;
- model/provider and reasoning settings;
- context/retrieval references;
- tool calls and results;
- timestamps and latency;
- token/cost accounting;
- approvals/handoffs;
- termination reason;
- final outcome graders.

Sensitive raw content should follow privacy and permission-isolation policy.

## 5. Trace mining
Production traces should feed the living eval corpus. Recurring behavior clusters, rare failures, and high-cost paths are candidates for new regression tasks.

## References
- OpenAI, Trace grading — https://developers.openai.com/api/docs/guides/trace-grading
- OpenAI, Agent evals — https://developers.openai.com/api/docs/guides/agent-evals
- Anthropic, Demystifying evals for AI agents — https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-evals.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-EVAL-001 — Evaluation Fundamentals](AEP-EVAL-001-evaluation-fundamentals.md)
- [AEP-TOOL-009 — Tool Observability and Evaluation](../tools/AEP-TOOL-009-tool-observability-and-evaluation.md)
- [AEP-AGENT-010 — Multi-Agent Evaluation, Lifecycle, and Freshness](../agents/AEP-AGENT-010-multi-agent-lifecycle-evaluation-and-freshness.md)
