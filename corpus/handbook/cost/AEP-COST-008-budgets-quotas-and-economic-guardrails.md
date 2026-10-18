---
schema_version: '1.0'
id: AEP-COST-008
title: Budgets, Quotas, and Economic Guardrails
summary: 'Budgets, Quotas, and Economic Guardrails. Focus: budgets, quotas.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- cost-performance
tags:
- budgets
- quotas
scope:
- enterprise-global
related:
- AEP-COST-002
- AEP-AGENT-009
- AEP-SEC-005
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/cost/AEP-COST-008-budgets-quotas-and-economic-guardrails.md
  original_sha256: cc94e8cf8762fad6e8f32b76a7174986b263dd7341343ffd212553e8a6f063f3
  original_metadata_record: handbook/cost/AEP-COST-008-budgets-quotas-and-economic-guardrails.md
  authority: inherited-source-context
---

# AEP-COST-008 — Budgets, Quotas, and Economic Guardrails

## 1. Purpose
Autonomous systems require explicit economic boundaries just as they require authority boundaries.

## 2. Budget dimensions
Budgets may be expressed as:

```text
currency / task
currency / scope / month
tokens / task
model calls / task
tool calls / task
subagents / task
wall time / task
retry count
human-review minutes
```

## 3. Soft and hard limits
### Soft limit
Trigger adaptation: smaller model, reduced fan-out, delayed enrichment, or explicit user notice where appropriate.

### Hard limit
Stop, checkpoint, or require authorization. Do not silently exceed a configured ceiling.

## 4. Risk-adjusted budgets
Higher-risk or higher-value work may justify more compute. A trivial formatting task and a production incident should not share identical budgets.

## 5. Runaway prevention
Detect:

- retry loops;
- repeated retrieval of the same evidence;
- oscillating edits;
- recursive delegation;
- duplicate parallel work;
- repeated escalation without new information.

## 6. Tenant/permission isolation
Budgets and accounting should be separable by scope or business boundary where required. One tenant must not consume another's quota.

## 7. Recommendation
Treat economic limits as external policy enforced by the harness/platform, not as suggestions encoded only in prompts.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-cost.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-COST-002 — Cost Accounting and Unit Economics](AEP-COST-002-cost-accounting-and-unit-economics.md)
- [AEP-AGENT-009 — Termination, Progress, and Recovery](../agents/AEP-AGENT-009-termination-progress-and-recovery.md)
- [AEP-SEC-005 — Least Privilege and Capability Authorization](../security/AEP-SEC-005-least-privilege-and-capability-authorization.md)
