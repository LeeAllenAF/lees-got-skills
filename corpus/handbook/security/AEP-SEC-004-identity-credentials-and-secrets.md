---
schema_version: '1.0'
id: AEP-SEC-004
title: Identity, Credentials, and Secrets
summary: 'Identity, Credentials, and Secrets. Focus: credentials, identity, secrets.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- security
tags:
- credentials
- identity
- secrets
scope:
- enterprise-global
related:
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
  original_path: agentic-engineering-platform/handbook/security/AEP-SEC-004-identity-credentials-and-secrets.md
  original_sha256: 7dedb6f8de6751e84d85471795e43529ba8547d3033cd20e936f1e79a1df06b5
  original_metadata_record: handbook/security/AEP-SEC-004-identity-credentials-and-secrets.md
  authority: inherited-source-context
---

# AEP-SEC-004 — Identity, Credentials, and Secrets

## 1. Purpose
Credentials convert model decisions into real authority. They must therefore be treated as security capabilities, not convenient configuration.

## 2. Core guidance
Prefer short-lived, scoped, workload-specific credentials over static broad secrets. Agents should receive only the credential material required for the current operation and should not need to reason over raw secrets.

## 3. Identity separation
Where feasible, distinguish:
- the human principal;
- the agent/workload identity;
- the tool/service identity;
- the target-resource authorization context.

This enables accountability and prevents one shared credential from becoming universal authority.

## 4. Secret handling
- never embed secrets in prompts, memory, or reusable handbook content;
- inject credentials at the execution boundary;
- redact secrets from traces and tool output;
- rotate and revoke credentials independently of agent configuration;
- prefer delegated/OAuth/workload identity mechanisms to copied long-lived tokens.

## 5. Credential scope
Scope credentials by resource, action, environment, tenant/scope, duration, and where useful network origin.

## 6. Security failure to avoid
A read-only reasoning task should not run with a production-admin credential merely because the same agent may sometimes deploy software.

## 7. Verification
Credential and identity configuration should be testable with negative cases: attempts to access other permission scopes, environments, resources, or operations must fail.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-security.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-TOOL-006 — Authority, Permissions, and Side Effects](../tools/AEP-TOOL-006-authority-permissions-and-side-effects.md)
- [AEP-SEC-005 — Least Privilege and Capability Authorization](AEP-SEC-005-least-privilege-and-capability-authorization.md)
- [HARNESS-CODEX-SDK-01-SDK-FOUNDATIONS — Codex TypeScript SDK foundations](../../harness/codex-sdk/01-sdk-foundations.md)
