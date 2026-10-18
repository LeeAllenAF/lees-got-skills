---
schema_version: '1.0'
id: AEP-CODE-012
title: CI/CD Diagnosis and Repair
summary: 'CI/CD Diagnosis and Repair. Focus: ci cd, debugging.'
type: playbook
status: recommended
version: 0.1.0
collection: handbook
domains:
- software-engineering
tags:
- ci-cd
- debugging
scope:
- enterprise-global
related:
- AEP-CODE-006
- AEP-TOOL-006
- AEP-AGENT-009
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/coding/AEP-CODE-012-ci-cd-diagnosis-and-repair.md
  original_sha256: 17150c8fbf8efe3664ba998edddf7dc79f3d6b4fb97b69a3363831e1954648d8
  original_metadata_record: handbook/coding/AEP-CODE-012-ci-cd-diagnosis-and-repair.md
  authority: inherited-source-context
---

# AEP-CODE-012 — CI/CD Diagnosis and Repair

## 1. Principle
Treat CI failures as observable evidence, not invitations to disable safeguards.

## 2. Workflow
Identify the first causally relevant failure; distinguish product-code failures from pipeline/environment failures; reproduce locally or in an equivalent environment when possible; repair the cause; rerun the narrow stage; then validate downstream stages as appropriate.

## 3. Guardrails
Do not bypass failing tests, weaken security checks, remove required approvals, broaden credentials, or disable quality gates merely to make a pipeline green unless explicitly authorized as a temporary incident measure.

## 4. Flakiness
Repeated reruns are not a fix. If success depends on retries, classify the failure as flaky and preserve evidence for root-cause work.

## 5. Production actions
Deployment, rollback, credential, infrastructure, and production-data operations should follow the authority model of AEP-TOOL-006 and AEP-AGENT-008.

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

- [AEP-CODE-006 — Debugging and Root-Cause Analysis](AEP-CODE-006-debugging-and-root-cause-analysis.md)
- [AEP-TOOL-006 — Authority, Permissions, and Side Effects](../tools/AEP-TOOL-006-authority-permissions-and-side-effects.md)
- [AEP-AGENT-009 — Termination, Progress, and Recovery](../agents/AEP-AGENT-009-termination-progress-and-recovery.md)
