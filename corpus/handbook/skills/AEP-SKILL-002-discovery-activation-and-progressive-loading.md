---
schema_version: '1.0'
id: AEP-SKILL-002
title: Skill Discovery, Activation, and Progressive Loading
summary: 'Skill Discovery, Activation, and Progressive Loading. Focus: progressive disclosure, skill discovery.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- skill-engineering
tags:
- progressive-disclosure
- skill-discovery
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
  original_path: agentic-engineering-platform/handbook/skills/AEP-SKILL-002-discovery-activation-and-progressive-loading.md
  original_sha256: aad14121893e04a1e1dd5c1c9640cc9bfcb9adea0224f60fcdd4c7192e081e21
  original_metadata_record: handbook/skills/AEP-SKILL-002-discovery-activation-and-progressive-loading.md
  authority: inherited-source-context
---

# Skill Discovery, Activation, and Progressive Loading

## Principle

A skill should expose **just enough metadata to be discoverable before its full body is loaded**.

Current skill systems from both OpenAI and Anthropic use this pattern: models first see lightweight name/description metadata, then load the full instructions and supporting resources only when the skill is relevant.

## Three-stage disclosure model

```text
Stage 1 — catalog metadata
name
description
scope/tags
compatibility

Stage 2 — operational instructions
SKILL.md

Stage 3 — deep resources
references/
examples/
scripts/
templates/
```

This avoids permanently occupying context with details for capabilities that may never be used.

## Activation metadata

Descriptions should explain both:

- what the skill does;
- when it should be used.

Bad:

> Handles React.

Better:

> Implement or review React components using the repository's existing state, styling, accessibility, testing, and component conventions. Use when the current repository is React-based and the task modifies UI components.

Avoid descriptions so broad that many skills match every request.

## Deterministic vs model-selected activation

Possible strategies include:

```text
model-selected
rule-selected
metadata-filtered
explicit user selection
tool/harness-selected
hybrid
```

The default should depend on catalog size, task risk, and measurability.

For small skill catalogs, model selection may be sufficient. Larger or higher-risk catalogs may benefit from deterministic filtering before model selection.

## Loading discipline

Loading a skill does not imply loading every supporting file.

The agent should retrieve deeper material only when required.

Examples:

- load a schema when producing structured output;
- load a migration reference when performing a migration;
- run a helper script instead of reading its implementation unless inspection is required.

## Failure modes

- ambiguous descriptions cause incorrect activation;
- overlapping skills create routing conflicts;
- giant SKILL.md files recreate static-context bloat;
- nested references become difficult to discover;
- capability catalogs themselves consume excessive context;
- a skill remains loaded after it is no longer relevant.

## Current recommendation

Treat skill discovery as a retrieval problem with measurable precision, recall, and downstream task success.

## Sources

- OpenAI, *Skills*: https://developers.openai.com/api/docs/guides/tools-skills
- Anthropic, *Introducing Agent Skills*: https://www.anthropic.com/research/skills

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-skills.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [HARNESS-CODEX-PLUGIN-02-SKILLS — Skill design and agent guidance](../../harness/codex-plugin/02-skills.md)
