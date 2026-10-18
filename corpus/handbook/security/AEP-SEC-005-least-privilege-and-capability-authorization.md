---
schema_version: '1.0'
id: AEP-SEC-005
title: Least Privilege and Capability Authorization
summary: 'Least Privilege and Capability Authorization. Focus: authorization, least privilege.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- security
tags:
- authorization
- least-privilege
scope:
- enterprise-global
related:
- AEP-P-021
- AEP-TOOL-006
- AEP-SEC-004
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 60d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/security/AEP-SEC-005-least-privilege-and-capability-authorization.md
  original_sha256: 3f7f0e93466b9e087d26ac1c31ac889b004782eb03cb87c6dcd698d480bb8c94
  original_metadata_record: handbook/security/AEP-SEC-005-least-privilege-and-capability-authorization.md
  authority: inherited-source-context
---

# AEP-SEC-005 — Least Privilege and Capability Authorization

## 1. Purpose
An agent should be able to propose many actions while being authorized to execute only the subset appropriate to the current principal, task, and environment.

## 2. Authorization must be external
The model must not grant itself permissions, interpret its own permission policy as authoritative enforcement, or bypass controls by changing prompt state.

## 3. Capability design
Prefer narrowly scoped capabilities such as:

```text
read repository A
create branch in repository A
run tests in sandbox
request deployment to staging
```

over broad capabilities such as:

```text
full GitHub access
cloud admin
shell anywhere
```

## 4. Evaluate action arguments
Authorization should consider the exact target and arguments, not only the tool name. `delete_file` and `write_file` are obvious examples, but even a generic shell or HTTP tool can become highly privileged depending on arguments.

## 5. Default deny
Unknown tools, destinations, resources, clients, environments, or action classes should fail closed unless an explicit policy permits them.

## 6. Delegation
When agents delegate work, authority should not automatically expand. A subagent should inherit at most the capabilities needed for its bounded task.

## 7. Auditability
Authorization decisions should record principal, requested action, target, policy decision, approval if any, and final execution result.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-security.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
- [AEP-TOOL-006 — Authority, Permissions, and Side Effects](../tools/AEP-TOOL-006-authority-permissions-and-side-effects.md)
- [AEP-SEC-004 — Identity, Credentials, and Secrets](AEP-SEC-004-identity-credentials-and-secrets.md)
