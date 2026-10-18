---
schema_version: '1.0'
id: PACK-METADATA-REVIEW
title: Metadata normalization review
summary: 'Metadata normalization review. Focus: metadata, verification.'
type: report
status: informational
version: 1.0.0
collection: assembly
domains:
- package-navigation
tags:
- metadata
- verification
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
  original_metadata_record: null
  authority: reference-only
---
# Metadata normalization review

All 190 imported Markdown documents received explicit primary-topic classifications. Every Markdown file in the package, including generated indexes and this report, now has the same front-matter fields and passes the shared schema.

## Decisions

- Keep original handbook document IDs; preserve existing harness catalog IDs.
- Normalize tags to lowercase kebab-case, sorted and unique, with controlled definitions.
- Use a small number of focused tags instead of copying every keyword from the text.
- Fill missing classifications, including assurance, audit, operations, permission, source-intelligence, and harness documents.
- Separate broad `domains` used for routing from the more specific `tags` used for filtering.
- Preserve original status and applicability. Preserve old metadata and technical review dates in auditable records.
- Retain body prose unchanged; normalize front matter and maintain generated navigation separately.
- Keep unresolved experiment and question references as recorded gaps.

Examples of deliberate distinctions: `model-routing` is separate from `model-cascades`; `human-approval` is separate from `human-evaluation`; `prompt-caching` is narrower than `caching`; `software-testing` is separate from agent-system `evaluation`.

## Evidence and limitations

[classification-review.json](metadata/classification-review.json) provides each source document's old/new tags and domains, content excerpt, review rationale, and body checksums. [original-metadata.json](metadata/original-metadata.json) preserves the source YAML and all legacy fields. [TAXONOMY.md](TAXONOMY.md) defines each accepted tag; [TAG-INDEX.md](TAG-INDEX.md) supports tag-based discovery.

The automated gate checks schema compliance, vocabulary membership, sorted/deduplicated tags, unique IDs, catalog completeness, matching metadata/hashes, and unchanged imported body prose. Semantic classification is an assistant judgment supported by content inspection, not something schema validation proves. This pass does not verify current SDK, API, protocol, pricing, or security claims against external sources.
