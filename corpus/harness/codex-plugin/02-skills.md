---
schema_version: '1.0'
id: HARNESS-CODEX-PLUGIN-02-SKILLS
title: Skill design and agent guidance
summary: 'Skill design and agent guidance. Focus: progressive disclosure, skill authoring.'
type: guidance
status: informational
version: 1.0.0
collection: harness
domains:
- codex-integration
tags:
- progressive-disclosure
- skill-authoring
scope:
- portable-reference
related: []
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-14'
  technical_review_interval: null
  owner: null
provenance:
  source_archive: agentic-harness-foundations.zip
  original_path: agentic-harness-foundations/codex-plugin/02-skills.md
  original_sha256: e533d9efade80a507e837862378d4ec2d9fec07912027b2edd6c083e76c6a03a
  original_metadata_record: harness/codex-plugin/02-skills.md
  authority: reference-only
---
# Skill design and agent guidance

[← Index](../INDEX.md) · [Plugin packaging](01-plugin-foundations.md) · [MCP/hooks](03-mcp-and-hooks.md)

## What a skill is
**[DOCUMENTED]** A skill is a folder containing `SKILL.md`, usually with frontmatter including `name` and `description`, and optionally scripts, references, templates and assets. A skill defines *when to use a workflow* and *how to perform it*; tools implement live reads or controlled actions. [Official skills docs](https://developers.openai.com/plugins/concepts/skills).

## Good skill structure
```md
---
name: verify-relationships
description: Verify reported entity relationships against primary evidence.
---
# Objective
For each candidate relationship, verify evidence and record verdict.
# Preconditions
Use only accessible, approved sources.
# Procedure
1. Claim a verification task.
2. Inspect evidence references.
3. Confirm source identities and timestamps.
4. Submit verdict with citations.
# Completion
Every claim is confirmed, rejected or escalated.
# Failure
On insufficient evidence, abstain and record unresolved status.
```

## Style guidance [DESIGN]
Use concise, testable instructions rather than metaphorical or theatrical prose. Separate intent from hard permissions. Express success, failure, escalation, and evidence requirements explicitly. Put long technical specifications in linked references so the skill loads minimal default context.

## Testing
Test direct activation, indirect activation, missing inputs, non-trigger cases and adversarial source content. Measure whether correct tools are selected and whether output contracts are met.

## Relationship to SDK
An SDK controller can submit tasks to Codex with skill-oriented instructions; packaging a skill alone does not give that skill authority to create new inference turns.

Sources: https://developers.openai.com/plugins/build/skills ; https://developers.openai.com/plugins/concepts/skills

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/harness-codex-plugin.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-SKILL-002 — Skill Discovery, Activation, and Progressive Loading](../../handbook/skills/AEP-SKILL-002-discovery-activation-and-progressive-loading.md)
- [AEP-SKILL-003 — Skill Content and Package Design](../../handbook/skills/AEP-SKILL-003-skill-content-and-package-design.md)
- [AEP-SKILL-009 — Promotion from Handbook Knowledge to Skill](../../handbook/skills/AEP-SKILL-009-promotion-from-handbook-to-skill.md)
