---
schema_version: '1.0'
id: AEP-KNOW-001
title: Knowledge Service Fundamentals
summary: 'Knowledge Service Fundamentals. Focus: architecture, knowledge management.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- knowledge-systems
tags:
- architecture
- knowledge-management
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
  original_path: agentic-engineering-platform/handbook/knowledge/AEP-KNOW-001-knowledge-service-fundamentals.md
  original_sha256: 26109ec0123cfb777ea4a6bb46fd9a63afae66be9e31e9e8b74d69b2c381f703
  original_metadata_record: handbook/knowledge/AEP-KNOW-001-knowledge-service-fundamentals.md
  authority: inherited-source-context
---

# Knowledge Service Fundamentals

## Purpose

Define the architecture that turns the Agentic Engineering Platform handbook into an operational knowledge system consumable by humans, agents, CLIs, APIs, CI systems, and MCP clients.

## Core principle

The handbook remains the source of truth.

The knowledge service is a **compiled, queryable, policy-aware representation** of that knowledge.

```text
Canonical knowledge
  handbook
  standards
  decisions
  experiments
  skills
      ↓
ingestion / validation
      ↓
normalized knowledge graph + search indexes
      ↓
resolution layer
      ↓
MCP / API / CLI / IDE / CI
```

The service must never become a second undocumented source of policy.

## Responsibilities

The knowledge service may:

- validate documents and metadata;
- index content;
- retrieve relevant knowledge;
- resolve layered guidance;
- preserve provenance;
- expose freshness and status;
- discover relevant skills;
- explain conflicts;
- compose bounded context packages;
- provide machine-readable references to experiments and decisions.

It must not:

- invent organizational policy;
- silently override source documents;
- collapse unresolved conflicts;
- treat generated summaries as authoritative replacements;
- bypass authorization boundaries.

## Read-first architecture

The initial service should be predominantly read-only.

Mutations such as promoting guidance, changing status, publishing skills, or modifying scoped overlays should remain explicit repository/workflow operations until there is a demonstrated need for controlled write APIs.

## Stateless protocol edge

MCP/API requests should be independently interpretable where practical. Durable state should use explicit identifiers, versions, or task handles instead of hidden transport sessions.

## Current recommendation

Build the knowledge service only after the canonical schema and resolution semantics are stable enough to test. Start with deterministic indexing and resolution before adding LLM-based synthesis.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-knowledge.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [HARNESS-ARCHITECTURE-02-REFERENCE-DESIGN — Portable reference architecture](../../harness/architecture/02-reference-design.md)
