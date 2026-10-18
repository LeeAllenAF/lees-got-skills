---
schema_version: '1.0'
id: AEP-SKILL-001
title: Skill Fundamentals
summary: 'Skill Fundamentals. Focus: knowledge management, skills.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- skill-engineering
tags:
- knowledge-management
- skills
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
  original_path: agentic-engineering-platform/handbook/skills/AEP-SKILL-001-skill-fundamentals.md
  original_sha256: 5515612b0d4cee0659ef4de733d50c278ba04d6b5c801a5419b8fcc1db60966f
  original_metadata_record: handbook/skills/AEP-SKILL-001-skill-fundamentals.md
  authority: inherited-source-context
---

# Skill Fundamentals

## Purpose

Define when reusable agent knowledge should become a skill and how skills relate to handbook guidance, tools, agents, and repository context.

## Core model

A skill is a **reusable capability package** that teaches an agent how to perform a recognizable class of work. It is not the canonical owner of company policy, live system state, credentials, or authorization.

```text
Handbook / standards
        ↓
approved guidance
        ↓
Skill
  instructions
  references
  examples
  scripts
  templates
  evals
        ↓
Agent uses skill
        ↓
Tools / environment / verification
```

## Recommended boundary

Use a skill when successful work depends on repeatable procedure, domain conventions, templates, examples, or deterministic helpers.

Do not create a skill merely because a topic exists in the handbook.

A useful skill should answer:

- What recognizable goal does this skill support?
- When should it activate?
- What required inputs exist?
- Which guidance is normative?
- Which tools or capabilities may it use?
- What evidence must be collected?
- What output or postconditions are required?
- How is success verified?
- When should it stop or request human input?

## Skills are not tools

A tool exposes a capability or controlled action.

A skill teaches the agent how to accomplish a goal, possibly by combining tools.

```text
tool  = capability
skill = reusable procedure
agent = reasoner / orchestrator
```

Authentication, authorization, destructive-action protection, and live state remain outside the skill.

## Skills are not policy stores

Company standards should remain canonical in the handbook or policy system. Skills may reference and operationalize those standards, but should not silently fork them.

## Default package

A mature skill may contain:

```text
skill-name/
├── SKILL.md
├── references/
├── examples/
├── templates/
├── scripts/
├── schemas/
└── evals/
```

Only the files that add measurable value should exist.

## Current guidance

1. Keep the skill goal narrow enough to describe clearly.
2. Prefer one recognizable workflow over broad “expert personas.”
3. Keep activation metadata concise and discriminative.
4. Load detailed instructions only when the skill is relevant.
5. Prefer deterministic scripts for repeatable mechanical operations.
6. Link to canonical standards rather than duplicating them.
7. Include verification and failure handling.
8. Treat skill changes as behavior changes and evaluate them accordingly.

## Sources

- OpenAI, *Skills*: https://developers.openai.com/api/docs/guides/tools-skills
- OpenAI, *Skills – Plugins*: https://developers.openai.com/plugins/concepts/skills
- Anthropic, *Introducing Agent Skills*: https://www.anthropic.com/research/skills

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-skills.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [HARNESS-CODEX-PLUGIN-01-PLUGIN-FOUNDATIONS — Codex plugin development foundations](../../harness/codex-plugin/01-plugin-foundations.md)
