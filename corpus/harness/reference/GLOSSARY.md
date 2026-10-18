---
schema_version: '1.0'
id: HARNESS-REFERENCE-GLOSSARY
title: Glossary
summary: 'Glossary. Focus: glossary, harness design.'
type: reference
status: informational
version: 1.0.0
collection: harness
domains:
- reference
tags:
- glossary
- harness-design
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
  original_path: agentic-harness-foundations/reference/GLOSSARY.md
  original_sha256: 19a717b69494f0d4b5264c74851b6e976f8a67809b0d9bc7e5ff2bf1c3466828
  original_metadata_record: harness/reference/GLOSSARY.md
  authority: reference-only
---
# Glossary

[← Index](../INDEX.md)

| Term | Definition |
|---|---|
| Agent | Goal-directed model-based worker with instructions and capabilities |
| Harness | Execution environment and controls around a model worker |
| Agent loop | Observe, decide, act, evaluate, repeat |
| Orchestrator | Controller coordinating state and work execution |
| Skill | Packaged procedural instructions and resources |
| MCP | Standard interface for exposing tools/resources/prompts |
| Plugin | Distributable unit of skills, MCP config, and optionally host-specific extensions |
| Codex SDK | Programmatic wrapper around Codex execution and thread APIs |
| App Server | Bidirectional protocol for Codex threads, turns and events |
| ReAct | Reason/action iterative pattern |
| RAG | Retrieval-augmented generation |
| Reranker | Model/algorithm that orders retrieved candidates by relevance |
| Provenance | Traceable origin and version of an asserted fact |
| Checkpoint | Persisted execution state used for recovery |
| Idempotency | Repeating an operation without duplicate intended effects |
| Handoff | Delegation/transfer of work to another agent |
| HITL | Human-in-the-loop review/approval |
| Guardrail | Enforced or advisory behavioral boundary |
| Context engineering | Selection/organization of input to a model turn |
| Compaction | Compression of earlier context into usable shorter form |
| Structured output | Machine-validated response shape, e.g. JSON Schema |
| Trace | Correlated record of execution events |

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/harness-reference.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-GLOSS-001 — Agent Engineering Glossary](../../handbook/foundations/AEP-GLOSS-001-glossary.md)
