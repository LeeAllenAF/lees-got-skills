---
schema_version: '1.0'
id: AEP-CODE-011
title: Pull Request Review
summary: 'Pull Request Review. Focus: code review, verification.'
type: playbook
status: recommended
version: 0.1.0
collection: handbook
domains:
- software-engineering
tags:
- code-review
- verification
scope:
- enterprise-global
related:
- AEP-AGENT-007
- AEP-CODE-008
- AEP-EVAL-001
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/coding/AEP-CODE-011-pull-request-review.md
  original_sha256: ca2d92939255d7673d648aed63f977458b8ffb905fef5d323e62ec6a2a73c867
  original_metadata_record: handbook/coding/AEP-CODE-011-pull-request-review.md
  authority: inherited-source-context
---

# AEP-CODE-011 — Pull Request Review

## 1. Principle
Review should search for material defects, requirement gaps, security/reliability risks, and maintainability problems—not maximize comment count.

## 2. Review order
1. Understand intended behavior and scope.
2. Inspect changed interfaces and data flows.
3. Trace high-risk paths and call sites.
4. Check tests and verification evidence.
5. Look for regressions, edge cases, security, concurrency, error-handling, and migration concerns.
6. Distinguish blocking defects from optional suggestions.

## 3. Agent review behavior
Avoid inventing repository rules, stylistic preferences, or hypothetical problems without evidence. Prefer fewer high-confidence findings with file/line evidence and concrete consequence.

## 4. Independence
For high-impact changes, review quality may improve when the reviewer is not exposed to the implementer's private reasoning, while still having access to requirements and repository evidence.

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

- [AEP-AGENT-007 — Critique, Refinement, and Verification](../agents/AEP-AGENT-007-critique-refinement-and-verification.md)
- [AEP-CODE-008 — Testing and Verification](AEP-CODE-008-testing-and-verification.md)
- [AEP-EVAL-001 — Evaluation Fundamentals](../evals/AEP-EVAL-001-evaluation-fundamentals.md)
