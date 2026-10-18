---
schema_version: '1.0'
id: AEP-AGENT-008
title: Human-in-the-Loop and Authority Boundaries
summary: 'Human-in-the-Loop and Authority Boundaries. Focus: authorization, human approval.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- agent-architecture
tags:
- authorization
- human-approval
scope:
- enterprise-global
related:
- AEP-P-011
- AEP-TOOL-006
- AEP-MODEL-006
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/agents/AEP-AGENT-008-human-in-the-loop-and-authority-boundaries.md
  original_sha256: 0cfe3f0f54fe56a6f4b1fe74561c202559a21138fa7e134f151c92f906a3b2c2
  original_metadata_record: handbook/agents/AEP-AGENT-008-human-in-the-loop-and-authority-boundaries.md
  authority: inherited-source-context
---
# AEP-AGENT-008 — Human-in-the-Loop and Authority Boundaries

## Purpose
Define human involvement as an architectural control, not a last-minute UI prompt.

## Approval triggers
Human review is appropriate when actions are irreversible, financially consequential, security-sensitive, externally communicative, destructive, legally material, production-impacting, or ambiguous beyond the authorized policy.

## Approval placement
Prefer approval at the narrowest meaningful boundary: after the system has gathered evidence and prepared an action, but before the consequential side effect occurs.

## Escalation packet
A human should receive:
- intended action;
- evidence and source provenance;
- expected effect;
- alternatives where material;
- uncertainty or failed checks;
- exact authority being requested.

## Anti-patterns
- approval fatigue for harmless reads;
- asking humans to approve opaque actions;
- treating human approval as compensation for excessive tool authority;
- letting agents silently broaden permissions after approval.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-agents.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
- [AEP-TOOL-006 — Authority, Permissions, and Side Effects](../tools/AEP-TOOL-006-authority-permissions-and-side-effects.md)
- [AEP-MODEL-006 — Cascades, Escalation, and Rescue](../models/AEP-MODEL-006-cascades-escalation-and-rescue.md)
- [HARNESS-APP-SERVER-01-APP-SERVER-FOUNDATIONS — Codex App Server foundations](../../harness/app-server/01-app-server-foundations.md)
