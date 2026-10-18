---
schema_version: '1.0'
id: AEP-ASSURE-009
title: Findings and Promotion Gates
summary: 'Findings and Promotion Gates. Focus: release gates, security findings.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- security-assurance
tags:
- release-gates
- security-findings
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
  original_path: agentic-engineering-platform/handbook/assurance/aep-assure-009-findings-and-promotion-gates.md
  original_sha256: 7613773c69d2bfb1983a7997b53bc50157f4d2cfd40b12349f6aa1b14e93b6e7
  original_metadata_record: handbook/assurance/aep-assure-009-findings-and-promotion-gates.md
  authority: inherited-source-context
---

# Findings and Promotion Gates

## Purpose

Security findings must influence whether models, skills, tools, retrieval configurations, or workflows can be promoted.

## Guidance

- Classify severity and exploitability.
- Require remediation or explicit exception for blockers.
- Link findings to affected versions.
- Re-test after fixes.
- Do not bury security regressions inside aggregate scores.

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
