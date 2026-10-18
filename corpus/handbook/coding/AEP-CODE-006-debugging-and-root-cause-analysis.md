---
schema_version: '1.0'
id: AEP-CODE-006
title: Debugging and Root-Cause Analysis
summary: 'Debugging and Root-Cause Analysis. Focus: debugging, root cause analysis.'
type: playbook
status: recommended
version: 0.1.0
collection: handbook
domains:
- software-engineering
tags:
- debugging
- root-cause-analysis
scope:
- enterprise-global
related:
- AEP-CODE-001
- AEP-AGENT-009
- AEP-CTX-010
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/coding/AEP-CODE-006-debugging-and-root-cause-analysis.md
  original_sha256: 72b06c5df749e2e9236a59e21f8833dcfa2c947451f0de26bc76b48351a761fc
  original_metadata_record: handbook/coding/AEP-CODE-006-debugging-and-root-cause-analysis.md
  authority: inherited-source-context
---

# AEP-CODE-006 — Debugging and Root-Cause Analysis

## 1. Principle
Debugging should reduce uncertainty through evidence, not cycle through plausible edits.

## 2. Workflow
```text
reproduce or establish observable failure
  ↓
collect evidence
  ↓
form ranked hypotheses
  ↓
run discriminating checks
  ↓
identify root cause
  ↓
apply minimal fix
  ↓
verify failure disappears without regression
```

## 3. Evidence sources
Prefer logs, stack traces, failing tests, type errors, runtime state, recent diffs, configuration, dependency changes, metrics, and controlled experiments over speculation.

## 4. Avoid patch churn
If successive edits do not reduce the hypothesis space or improve an objective failure signal, stop and reformulate rather than continuing to edit.

## 5. Root cause vs symptom
A workaround may be appropriate under operational pressure, but the agent should identify when it has mitigated a symptom rather than established the root cause.

## References
- OpenAI, Prompt engineering / coding guidance — https://developers.openai.com/api/docs/guides/prompt-engineering
- OpenAI, Agent evals — https://developers.openai.com/api/docs/guides/agent-evals
- OpenAI, Rethinking skills and prompts for GPT-6 Astra — https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra
- Anthropic, Building effective agents — https://www.anthropic.com/engineering/building-effective-agents
- Anthropic, Harness design for long-running application development — https://www.anthropic.com/engineering/harness-design-long-running-apps
- Anthropic, Demystifying evals for AI agents — https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-coding.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-CODE-001 — Software Engineering Agent Fundamentals](AEP-CODE-001-software-engineering-agent-fundamentals.md)
- [AEP-AGENT-009 — Termination, Progress, and Recovery](../agents/AEP-AGENT-009-termination-progress-and-recovery.md)
- [AEP-CTX-010 — Repository Context and Code Intelligence](../context/AEP-CTX-010-repository-context-and-code-intelligence.md)
