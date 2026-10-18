---
schema_version: '1.0'
id: AEP-SEC-007
title: Human Approvals and Consequential Actions
summary: 'Human Approvals and Consequential Actions. Focus: consequential actions, human approval.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- security
tags:
- consequential-actions
- human-approval
scope:
- enterprise-global
related:
- AEP-AGENT-008
- AEP-TOOL-006
- AEP-SEC-005
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 60d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/security/AEP-SEC-007-human-approvals-and-consequential-actions.md
  original_sha256: 28f9f8f9882742f562e2efb45d2dc45b53f409324df98443d6326ca43b2a6b68
  original_metadata_record: handbook/security/AEP-SEC-007-human-approvals-and-consequential-actions.md
  authority: inherited-source-context
---

# AEP-SEC-007 — Human Approvals and Consequential Actions

## 1. Purpose
Human approval is a control for decisions where automatic authorization is insufficient because consequences are material, ambiguous, irreversible, or require accountable judgment.

## 2. Approve the exact action
Approval should occur as close as practical to the side effect and show the reviewer the target, action, relevant arguments, data disclosure, and expected impact.

## 3. Typical approval candidates
- production deployment or destructive mutation;
- sending external communications;
- deleting or overwriting important data;
- modifying access controls;
- creating financial commitments;
- disclosure of sensitive information;
- security-sensitive actions outside a preapproved engagement scope.

## 4. Avoid approval theater
A prompt such as “Allow this tool?” is weak if the reviewer cannot see the real operation. Approval packets should be concise but decision-complete.

## 5. Avoid approval fatigue
Move low-risk repeatable actions inside well-defined sandboxes/policies rather than requiring constant clicks. Reserve approvals for meaningful boundaries.

## 6. Approval is not authorization
The requested action must still satisfy deterministic policy. Human approval should not bypass hard tenant, credential, or scope restrictions.

## 7. Fail closed
If required review is unavailable, times out, or returns ambiguous state, do not perform the side effect.

## References
- OpenAI, Guardrails and human review — https://developers.openai.com/api/docs/guides/agents/guardrails-approvals

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-security.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-AGENT-008 — Human-in-the-Loop and Authority Boundaries](../agents/AEP-AGENT-008-human-in-the-loop-and-authority-boundaries.md)
- [AEP-TOOL-006 — Authority, Permissions, and Side Effects](../tools/AEP-TOOL-006-authority-permissions-and-side-effects.md)
- [AEP-SEC-005 — Least Privilege and Capability Authorization](AEP-SEC-005-least-privilege-and-capability-authorization.md)
- [HARNESS-APP-SERVER-02-LIFECYCLE-AND-INTEGRATION — App Server lifecycle and integration decisions](../../harness/app-server/02-lifecycle-and-integration.md)
