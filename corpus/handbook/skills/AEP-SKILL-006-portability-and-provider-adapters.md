---
schema_version: '1.0'
id: AEP-SKILL-006
title: Skill Portability and Provider Adapters
summary: 'Skill Portability and Provider Adapters. Focus: provider portability, skills.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- skill-engineering
tags:
- provider-portability
- skills
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
  original_path: agentic-engineering-platform/handbook/skills/AEP-SKILL-006-portability-and-provider-adapters.md
  original_sha256: 443554e3545a242568a8e7451d5423cd44cd3c809772b53b4d57577cfaeecb38
  original_metadata_record: handbook/skills/AEP-SKILL-006-portability-and-provider-adapters.md
  authority: inherited-source-context
---

# Skill Portability and Provider Adapters

## Principle

the platform should own the reusable knowledge; providers should own the adapters.

Skills are increasingly portable across agent surfaces, but loading semantics, authority rules, sandbox behavior, metadata, and invocation mechanisms still differ.

## Canonical vs adapter layers

```text
the platform canonical skill
        ↓
capability contract
        ↓
provider adapters
  ├── OpenAI / Codex
  ├── Claude / Claude Code
  ├── other agents
  └── internal harness
```

## Canonical content

Keep provider-neutral:

- purpose;
- activation conditions;
- workflow logic;
- standards references;
- input/output contracts;
- verification requirements;
- examples;
- deterministic scripts where portable;
- evals.

## Adapter content

Provider-specific behavior may include:

- file location;
- manifest metadata;
- invocation syntax;
- discovery registration;
- sandbox layout;
- provider-specific tool names;
- provider-specific workarounds.

## Avoid lowest-common-denominator design

Portability does not mean suppressing useful provider capabilities.

Prefer a stable canonical core plus optional provider enhancements.

## Drift control

Provider adapters require shorter review intervals than canonical skill logic.

Any workaround for a provider/model limitation should include:

- reason;
- originating failure/eval;
- compatibility range if known;
- removal criteria;
- review date.

## Current evidence

OpenAI describes Skills as compatible with the open Agent Skills standard, while Anthropic describes its skills as portable across Claude apps, Claude Code, and API. This supports portable skill design but does not imply identical runtime behavior.

## Sources

- OpenAI, *Skills*: https://developers.openai.com/api/docs/guides/tools-skills
- Anthropic, *Introducing Agent Skills*: https://www.anthropic.com/research/skills

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-skills.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [HARNESS-CODEX-PLUGIN-01-PLUGIN-FOUNDATIONS — Codex plugin development foundations](../../harness/codex-plugin/01-plugin-foundations.md)
