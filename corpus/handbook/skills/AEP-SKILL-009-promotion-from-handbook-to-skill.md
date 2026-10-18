---
schema_version: '1.0'
id: AEP-SKILL-009
title: Promotion from Handbook Knowledge to Skill
summary: 'Promotion from Handbook Knowledge to Skill. Focus: knowledge promotion, skills.'
type: playbook
status: recommended
version: 0.1.0
collection: handbook
domains:
- skill-engineering
tags:
- knowledge-promotion
- skills
scope:
- portable-reference
related: []
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 120d
  owner: null
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/skills/AEP-SKILL-009-promotion-from-handbook-to-skill.md
  original_sha256: 36242490dce2d58c948f486303296388b23695838700696bd6ded1e7ccc32be4
  original_metadata_record: handbook/skills/AEP-SKILL-009-promotion-from-handbook-to-skill.md
  authority: inherited-source-context
---

# Promotion from Handbook Knowledge to Skill

## Purpose

Define when mature the platform knowledge should become an executable/reusable skill.

## Promotion lifecycle

```text
research
   ↓
handbook guidance
   ↓
experiment / operational evidence
   ↓
stable recurring workflow identified
   ↓
skill candidate
   ↓
skill implementation
   ↓
skill eval
   ↓
approved skill
   ↓
production telemetry
   ↓
revision / deprecation
```

## Promotion criteria

A handbook topic should not automatically become a skill.

Create a skill when:

- the workflow recurs;
- procedural consistency matters;
- instructions are sufficiently stable;
- activation conditions can be described;
- required inputs and outputs are known;
- success can be evaluated;
- packaging reduces repeated explanation or errors.

## Do not promote when

- knowledge is primarily explanatory;
- procedure is too unstable;
- task remains highly bespoke;
- live authoritative state is the real requirement;
- deterministic software would be better;
- the skill would merely duplicate repository/scope instructions.

## Provenance

Each managed skill should reference the handbook standards, experiments, or decisions that justify its behavior.

Example:

```yaml
derived_from:
  - AEP-CODE-006
  - AEP-EVAL-002
evidence:
  - EXP-CODE-007
```

## Bidirectional learning

Skill failures should feed back into:

```text
trace
→ eval
→ open question
→ handbook revision
→ skill revision
```

This prevents skills from becoming detached copies of organizational knowledge.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-skills.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [HARNESS-CODEX-PLUGIN-02-SKILLS — Skill design and agent guidance](../../harness/codex-plugin/02-skills.md)
