---
schema_version: '1.0'
id: PACK-PROVENANCE
title: Source provenance
summary: 'Source provenance. Focus: change history, provenance.'
type: reference
status: informational
version: 1.0.0
collection: assembly
domains:
- package-navigation
tags:
- change-history
- provenance
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
  original_metadata_record: PROVENANCE.md
  authority: reference-only
---
# Source provenance

This package imports `handbook/**` from `agentic-engineering-platform-handoff.zip` (October 1, 2026; Library ID `libfile_15f79967d4ec8191b332bb59694c2040`) and all files from `agentic-harness-foundations.zip` (October 14, 2026; Library ID `libfile_c750eb444a048191814d8e863ee048e9`). It uses the specifically requested original handoff, not the separate `handoff(1)` archive.

[provenance.json](provenance.json) records exact source archive hashes, original member paths, destination paths, and original file hashes. Imported body prose remains intact. Front matter is normalized under the shared schema, and generated context navigation is appended to Markdown. Original front matter is retained in [metadata/original-metadata.json](metadata/original-metadata.json). Original harness `AGENTS.md`, `INDEX.md`, `README.md`, and `manifest.json` remain scoped to the harness subdirectory.

No content was promoted to a higher authority or re-reviewed for current API accuracy. Overlapping topics remain complementary documents, linked through curated reading paths and cross-collection links. New root files and indexes are assembly/navigation material, not additional engineering policy.
