---
schema_version: '1.0'
id: AEP-SEC-009
title: Production Access, Destructive Operations, and Change Control
summary: 'Production Access, Destructive Operations, and Change Control. Focus: change control, destructive actions.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- security
tags:
- change-control
- destructive-actions
scope:
- enterprise-global
related:
- AEP-SEC-007
- AEP-CODE-012
- AEP-TOOL-005
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 60d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/security/AEP-SEC-009-production-access-destructive-operations-and-change-control.md
  original_sha256: 8d03f59e038b2fd58fc4d2e909533b39c46412c4a4e181f7c5bb73edf7df2aa0
  original_metadata_record: handbook/security/AEP-SEC-009-production-access-destructive-operations-and-change-control.md
  authority: inherited-source-context
---

# AEP-SEC-009 — Production Access, Destructive Operations, and Change Control

## 1. Purpose
Production access changes the consequence profile of agent mistakes. Production authority should be rare, narrowly scoped, and strongly observable.

## 2. Prefer promotion over direct mutation
Where feasible, agents should produce reviewable artifacts—code changes, plans, manifests, migration scripts, deployment requests—that existing change-control systems promote into production.

## 3. Destructive action classes
Classify operations such as delete, revoke, rotate, migrate, overwrite, scale-to-zero, terminate, publish, or externally communicate. Require stronger controls for irreversible or difficult-to-recover operations.

## 4. Preconditions
High-impact actions should verify:
- target/environment;
- principal and authorization;
- current state;
- expected impact;
- backup/rollback or compensating action;
- concurrency and idempotency constraints;
- required approval.

## 5. Two-phase pattern
For risky operations prefer:

```text
prepare / preview / plan
        ↓
validate + approve
        ↓
execute
        ↓
verify postcondition
```

## 6. Unknown outcomes
If a connection fails after a destructive request, do not blindly replay. Resolve whether the operation occurred before retrying.

## 7. Emergency stop
Long-running/autonomous systems need revocation and cancellation mechanisms independent of the model.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-security.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-SEC-007 — Human Approvals and Consequential Actions](AEP-SEC-007-human-approvals-and-consequential-actions.md)
- [AEP-CODE-012 — CI/CD Diagnosis and Repair](../coding/AEP-CODE-012-ci-cd-diagnosis-and-repair.md)
- [AEP-TOOL-005 — Errors, Retries, and Idempotency](../tools/AEP-TOOL-005-errors-retries-and-idempotency.md)
