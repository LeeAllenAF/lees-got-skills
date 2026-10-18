---
schema_version: '1.0'
id: AEP-SKILL-003
title: Skill Content and Package Design
summary: 'Skill Content and Package Design. Focus: packaging, skill authoring.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- skill-engineering
tags:
- packaging
- skill-authoring
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
  original_path: agentic-engineering-platform/handbook/skills/AEP-SKILL-003-skill-content-and-package-design.md
  original_sha256: 047978fd2655723fdaa3ea0a5449d65f08d096bce4886116442bb69c08361953
  original_metadata_record: handbook/skills/AEP-SKILL-003-skill-content-and-package-design.md
  authority: inherited-source-context
---

# Skill Content and Package Design

## Goal

Package reusable knowledge so agents can apply it consistently without turning the skill into an oversized prompt.

## SKILL.md should contain

- purpose and activation conditions;
- required inputs;
- workflow or decision procedure;
- constraints and non-goals;
- required tool behavior;
- verification requirements;
- stop/escalation conditions;
- pointers to deeper resources.

It should not contain every possible example, reference manual, or enterprise standard.

## Supporting material

Use supporting directories by function:

```text
references/  background or canonical supporting knowledge
examples/    representative successful inputs/outputs
templates/   reusable artifacts
scripts/     deterministic helpers
schemas/     machine-verifiable structures
evals/       tasks and graders for the capability
```

## Prefer executable knowledge where appropriate

If a deterministic operation can be represented reliably in code, prefer a tested script over natural-language instructions telling the model to reproduce the operation manually.

Examples:

- normalize JSON;
- validate frontmatter;
- generate a dependency report;
- check repository policy;
- transform known formats.

## Example discipline

Examples should demonstrate difficult or representative cases, not merely idealized happy paths.

Examples can also accidentally overfit model behavior. Keep them small, purposeful, and covered by evals.

## Package independence

A skill should document external assumptions:

```text
requires:
  tools:
  runtime:
  repository_features:
  permissions:
  related_standards:
```

Do not rely on implicit environment knowledge.

## Current recommendation

The smallest useful skill package wins. Add a resource when it improves reliability, discoverability, cost, or maintenance—not because the directory structure allows it.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-skills.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [HARNESS-CODEX-PLUGIN-02-SKILLS — Skill design and agent guidance](../../harness/codex-plugin/02-skills.md)
