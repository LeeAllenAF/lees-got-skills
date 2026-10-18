---
schema_version: '1.0'
id: AEP-SKILL-010
title: Skill Lifecycle, Versioning, and Freshness
summary: 'Skill Lifecycle, Versioning, and Freshness. Focus: lifecycle, skills, versioning.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- skill-engineering
tags:
- lifecycle
- skills
- versioning
scope:
- portable-reference
related: []
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: null
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/skills/AEP-SKILL-010-skill-lifecycle-versioning-and-freshness.md
  original_sha256: a028e29f75fdb2f37a1f5026f03fe0a7cf84e2b6d252428b33c23efc13b8a4c6
  original_metadata_record: handbook/skills/AEP-SKILL-010-skill-lifecycle-versioning-and-freshness.md
  authority: inherited-source-context
---

# Skill Lifecycle, Versioning, and Freshness

## Principle

Skills are living executable knowledge. They must be versioned, evaluated, revalidated, and removable.

## Lifecycle

```text
candidate
  ↓
experimental
  ↓
recommended
  ↓
approved
  ↓
deprecated
  ↓
retired
```

A skill may also be rejected or superseded.

## Versioning

Version changes should communicate behavioral compatibility.

Major changes may include:

- changed goal or activation semantics;
- new authority requirements;
- incompatible input/output contract;
- materially different workflow.

Minor changes may include backward-compatible procedure improvements.

Patch changes may include wording, examples, or bug fixes that do not intentionally change the contract.

## Freshness triggers

Revalidate when:

- a referenced standard changes;
- a tool/MCP contract changes;
- a model generation changes materially;
- a provider changes skill-loading behavior;
- a language/framework ecosystem changes;
- a recurring production failure appears;
- security guidance changes;
- a skill is repeatedly not selected or selected incorrectly.

## Review intervals

Initial defaults:

```text
provider adapter/workaround   30–60d
security-sensitive skill      30–60d
framework-specific skill      60–90d
general workflow skill        90–180d
```

Event-driven review overrides the calendar.

## Deprecation

Deprecation should preserve:

- why the skill existed;
- what superseded it;
- migration guidance;
- historical eval evidence.

## Complexity deletion

Periodic review should explicitly ask:

> Which instructions, examples, dependencies, scripts, or provider workarounds can now be removed?

A smaller skill that preserves outcome quality is generally preferable.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-skills.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

Use the topic index for adjacent documents.
