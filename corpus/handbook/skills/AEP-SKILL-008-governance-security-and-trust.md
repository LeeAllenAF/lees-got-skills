---
schema_version: '1.0'
id: AEP-SKILL-008
title: Skill Governance, Security, and Trust
summary: 'Skill Governance, Security, and Trust. Focus: governance, skills, supply chain.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- skill-engineering
tags:
- governance
- skills
- supply-chain
scope:
- portable-reference
related: []
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 60d
  owner: null
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/skills/AEP-SKILL-008-governance-security-and-trust.md
  original_sha256: 1612b96ca94452097a141f0e277bbd65b74d2e020985accdd62918e55a8f6dce
  original_metadata_record: handbook/skills/AEP-SKILL-008-governance-security-and-trust.md
  authority: inherited-source-context
---

# Skill Governance, Security, and Trust

## Threat model

Skills can contain instructions, scripts, templates, examples, and references. Installing or updating a skill therefore changes the effective behavior of the agent and may introduce executable content.

Treat skills as software supply-chain artifacts.

## Required controls

For managed the platform skills, record:

- owner;
- source;
- version;
- status;
- checksum/signature where infrastructure supports it;
- review history;
- required permissions;
- scripts/executable content;
- external dependencies;
- linked standards;
- eval status.

## Trust tiers

Possible categories:

```text
the platform managed
enterprise managed
vendor managed
third-party reviewed
untrusted / experimental
```

Trust tier affects installation, execution, review, and update policy.

## Executable scripts

Scripts should receive normal software security treatment:

- source review;
- dependency review;
- least privilege;
- sandboxing;
- deterministic invocation;
- explicit inputs/outputs.

A skill description does not grant its scripts additional authority.

## Remote and third-party skills

Do not automatically execute newly discovered skill content from untrusted sources.

Review before promotion into trusted capability catalogs.

## Update security

Automatic updates can create silent behavioral changes. Production skill catalogs should use controlled promotion, version pinning where appropriate, and regression evaluation.

## Current guidance

Treat skill installation as a capability change, not as harmless documentation import.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-skills.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

Use the topic index for adjacent documents.
