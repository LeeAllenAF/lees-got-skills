---
schema_version: '1.0'
id: AEP-SKILL-007
title: Skill Evaluation and Quality
summary: 'Skill Evaluation and Quality. Focus: evaluation, skills.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- skill-engineering
tags:
- evaluation
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
  original_path: agentic-engineering-platform/handbook/skills/AEP-SKILL-007-skill-evaluation-and-quality.md
  original_sha256: 0253d9094dcd5abd30a3d5b5d19e8d5091ee928630622d407cd9942d0ab660ff
  original_metadata_record: handbook/skills/AEP-SKILL-007-skill-evaluation-and-quality.md
  authority: inherited-source-context
---

# Skill Evaluation and Quality

## Principle

A skill is a behavioral change to an agent system and should be evaluated as one.

## Evaluate at multiple layers

### Discovery

Did the correct skill activate?

Metrics may include:

- activation precision;
- activation recall;
- unnecessary activation rate;
- conflicting activation rate.

### Execution

Did the skill improve the task?

Measure:

- task success;
- adherence to required process;
- tool choice;
- verification completeness;
- retries;
- latency;
- token/cost impact.

### Robustness

Test:

- incomplete inputs;
- conflicting repository rules;
- unavailable tools;
- adversarial content;
- unsupported environments;
- provider/model changes.

## Compare against baselines

A skill should be compared against:

```text
no skill
vs
skill
```

and, when relevant:

```text
static instruction
vs
skill
vs
specialized agent/model
```

This prevents adding skills whose complexity does not materially improve outcomes.

## Regression suite

Once a skill becomes relied upon, representative successful cases should become a regression suite.

## Anti-overfitting

Do not optimize only against visible examples used to author the skill.

Maintain hidden or held-out cases where practical.

## Removal is success

If newer models or better tools make a skill unnecessary, removing the skill is an acceptable and often desirable outcome.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-skills.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

Use the topic index for adjacent documents.
