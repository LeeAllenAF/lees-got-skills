---
schema_version: '1.0'
id: PACK-README
title: Agentic Engineering Knowledge
summary: 'Agentic Engineering Knowledge. Focus: index navigation, knowledge management.'
type: reference
status: informational
version: 1.0.0
collection: assembly
domains:
- package-navigation
tags:
- index-navigation
- knowledge-management
scope:
- portable-reference
related: []
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: null
  technical_review_interval: null
  owner: null
provenance:
  source_archive: null
  original_path: null
  original_sha256: null
  original_metadata_record: README.md
  authority: reference-only
---
# Agentic Engineering Knowledge

A unified, portable reference package combining the 170-document engineering handbook with Agentic Harness and Codex Integration Foundations.

Start at [AGENTS.md](AGENTS.md), then use the [topic index](INDEX.md) or [task reading paths](READING-PATHS.md). For automated ingestion use [catalog.json](catalog.json); explicit relationships are in [graph.json](graph.json). All document paths in JSON are relative to this package root. Browse by [tag](TAG-INDEX.md), read the [metadata contract](METADATA.md), or inspect the [normalization review](METADATA-REVIEW.md).

## Organization

- `handbook/`: vendor-neutral engineering guidance, preserving original document IDs and metadata.
- `harness/`: harness concepts and Codex plugin, SDK, and App Server guidance, preserving its existing navigation.
- `indexes/`: small topic indexes for selective loading.
- `catalog.json`: document identity, title, scope, tags, headings, hashes, source lineage, and context links.
- `graph.json`: typed document and principle relationships; unresolved source IDs are recorded explicitly.
- `provenance.json`: original archive identities, hashes, and original-to-package file mappings.
- `scripts/reindex.py`: deterministic index rebuilding and local link validation (Python 3 and PyYAML).

## Scope and source fidelity

This is a documentation merge, assembled October 16, 2026. Original body prose and source technical-review dates are preserved; YAML front matter is normalized and generated navigation is appended beneath a marked boundary. This assembly date is not a new technical review. The platform runtime scaffold, deployment configuration, and implementation backlog outside `handbook/` are excluded. The full harness reference package is retained, including its original manifest (which describes that source package only).

Source approval labels and enterprise scopes describe the original handbook context; importing a document does not make it policy for another organization. Harness examples and API constraints remain contextual. Neither source automatically overrides the other. See [agent guidance](AGENTS.md) for conflict handling.

## Rebuild

Install the dependencies from `scripts/requirements.txt` in your chosen Python environment, then run `python3 scripts/reindex.py` from this directory. This regenerates indexes, document navigation, the catalog, graph, manifest, and validation report. It validates local Markdown file targets; it does not check remote URLs or fragment anchors. Source archive checksums record imported history; document checksums record the current packaged files.
