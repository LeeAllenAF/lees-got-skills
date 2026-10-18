---
schema_version: '1.0'
id: AEP-SEC-006
title: Sandboxing, Filesystem, and Network Isolation
summary: 'Sandboxing, Filesystem, and Network Isolation. Focus: network isolation, sandboxing.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- security
tags:
- network-isolation
- sandboxing
scope:
- enterprise-global
related:
- AEP-CODE-001
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
  original_path: agentic-engineering-platform/handbook/security/AEP-SEC-006-sandboxing-filesystem-and-network-isolation.md
  original_sha256: e9bcda4a8cce9bbf99400bcb52c436ff4a9be8e73bf15144ce357f508f00b67b
  original_metadata_record: handbook/security/AEP-SEC-006-sandboxing-filesystem-and-network-isolation.md
  authority: inherited-source-context
---

# AEP-SEC-006 — Sandboxing, Filesystem, and Network Isolation

## 1. Purpose
Runtime isolation turns model mistakes into bounded local failures rather than host, network, or production incidents.

## 2. Filesystem boundary
Coding agents should normally operate within an explicit workspace. Restrict access to unrelated home directories, credentials, SSH material, browser profiles, and other unrelated workspaces.

## 3. Network boundary
Network access should be deny-by-default or allowlisted for higher-risk workloads. Distinguish package registries, documentation, internal APIs, production services, and arbitrary internet destinations.

## 4. Process boundary
Limit process privileges, resource use, container/VM escape paths, host mounts, privileged sockets, and access to orchestration control planes.

## 5. Sandboxing improves usability too
A strong sandbox can safely allow more autonomous iteration inside the approved boundary and reduce repetitive approval prompts. Anthropic has reported large reductions in permission prompts from filesystem and network sandboxing in Claude Code.

## 6. Not a complete defense
A sandbox does not solve authorization, data leakage through permitted channels, dependency compromise, or malicious actions inside the sandbox.

## 7. Environment classes
Define at least development/sandbox, shared non-production, and production authority classes. Do not assume controls appropriate to a disposable workspace are sufficient for production.

## References
- Anthropic, Claude Code sandboxing — https://www.anthropic.com/engineering/claude-code-sandboxing

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-security.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-CODE-001 — Software Engineering Agent Fundamentals](../coding/AEP-CODE-001-software-engineering-agent-fundamentals.md)
- [AEP-SEC-005 — Least Privilege and Capability Authorization](AEP-SEC-005-least-privilege-and-capability-authorization.md)
- [HARNESS-CODEX-SDK-02-CONFIGURATION-AND-CAPABILITIES — SDK capability map: models, threads, and outputs](../../harness/codex-sdk/02-configuration-and-capabilities.md)
