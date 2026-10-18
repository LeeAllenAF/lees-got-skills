---
schema_version: '1.0'
id: AEP-ASSURE-007
title: Supply-Chain and Skill Security
summary: 'Supply-Chain and Skill Security. Focus: skills, supply chain.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- security-assurance
tags:
- skills
- supply-chain
scope:
- enterprise-global
related: []
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 60d
  owner: platform-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/assurance/aep-assure-007-supply-chain-and-skill-security.md
  original_sha256: 1b6a9743420b2da7bcd193bd1e9909ba68f24b64ee50fa051a57229d314ba87c
  original_metadata_record: handbook/assurance/aep-assure-007-supply-chain-and-skill-security.md
  authority: inherited-source-context
---

# Supply-Chain and Skill Security

## Purpose

Skills, MCP servers, dependencies, actions, model adapters, and retrieved code can introduce supply-chain risk.

## Guidance

- Pin and review critical dependencies.
- Treat skill installation as a capability change.
- Sandbox executable skill content.
- Evaluate third-party MCP authority.
- Track provenance and updates.

## Implementation implications

- Keep canonical state structured and versioned.
- Prefer deterministic enforcement where the requirement is objective.
- Preserve provenance through derived artifacts and agent context.
- Define failure behavior before broad automation.
- Add representative fixtures and regression tests as the capability becomes relied upon.

## Evaluation

At minimum, evaluate correctness, security boundary behavior, stale-state handling, downstream task impact, and operational cost where relevant.

## Lifecycle

This guidance is living knowledge. Revalidate it after relevant model, provider, security, source, identity, or architecture changes.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-assurance.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

Use the topic index for adjacent documents.
