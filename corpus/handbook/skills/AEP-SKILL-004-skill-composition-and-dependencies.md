---
schema_version: '1.0'
id: AEP-SKILL-004
title: Skill Composition and Dependencies
summary: 'Skill Composition and Dependencies. Focus: dependencies, skill composition.'
type: pattern
status: provisional
version: 0.1.0
collection: handbook
domains:
- skill-engineering
tags:
- dependencies
- skill-composition
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
  original_path: agentic-engineering-platform/handbook/skills/AEP-SKILL-004-skill-composition-and-dependencies.md
  original_sha256: 0169211fb14c56eff4d3ef4a0958bcacdeb7a0aaab5988ceae5a7a90bfac965c
  original_metadata_record: handbook/skills/AEP-SKILL-004-skill-composition-and-dependencies.md
  authority: inherited-source-context
---

# Skill Composition and Dependencies

## Problem

Real tasks often require multiple reusable capabilities. Skills must compose without becoming a hidden dependency graph that is harder to reason about than the original task.

## Default rule

Prefer **shallow composition**.

```text
task
 ├── repository-analysis
 ├── language-specific guidance
 └── verification
```

is preferable to:

```text
skill A
  → skill B
    → skill C
      → skill D
```

unless deeper dependency chains have measurable benefit.

## Dependency types

Distinguish:

- required capability;
- optional enhancement;
- reference-only relationship;
- ordering dependency;
- tool dependency;
- policy dependency.

## Avoid skill-as-agent confusion

Skills should not simulate multiple agents through long internal role chains. If independent execution, isolation, authority, or parallel work is required, use agent architecture deliberately.

## Conflict resolution

If multiple skills provide conflicting guidance:

1. higher-authority external policy wins;
2. repository/scope constraints are applied;
3. the conflict should be surfaced rather than silently merged;
4. skill-specific advice may not override canonical standards without an explicit allowed override.

## Circular dependencies

Skill packages should not have circular activation requirements.

Static validation should detect obvious cycles in declared dependencies.

## Current recommendation

Composition should remain understandable from a trace. If an engineer cannot explain why each skill loaded, the skill architecture is too opaque.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-skills.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

Use the topic index for adjacent documents.
