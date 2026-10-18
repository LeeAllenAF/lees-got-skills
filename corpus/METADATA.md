---
schema_version: '1.0'
id: PACK-METADATA
title: Metadata contract
summary: 'Metadata contract. Focus: metadata, schemas.'
type: reference
status: informational
version: 1.0.0
collection: assembly
domains:
- package-navigation
tags:
- metadata
- schemas
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
# Metadata contract

Every Markdown file, including navigation and reports, uses the same YAML front-matter schema: [front-matter.schema.json](metadata/front-matter.schema.json). JSON, Python, and text assets use their own native formats; YAML front matter is not inserted into those files.

| Field | Meaning |
| --- | --- |
| `schema_version` | Metadata contract version, independent of document version. |
| `id` | Stable original handbook ID, path-derived harness ID, or package navigation ID. |
| `title`, `summary` | Human-readable title and concise topic description. |
| `type` | Standard, guidance, pattern, playbook, evaluation, reference, index, plan, instruction, or report. |
| `status`, `version` | Inherited source status/version where present; new reference material defaults to informational. |
| `collection` | Handbook, harness, or assembly/navigation. |
| `domains` | Controlled broad routing category. |
| `tags` | Sorted, unique controlled terms describing primary subjects, usually two to four. |
| `scope` | Source applicability, preserved when present; otherwise portable-reference. |
| `related` | Inherited explicit relationships; unresolved source IDs remain visible in the graph. |
| `review` | Metadata review method/date, original technical review date/interval/owner when known, and an explicit technical-review flag. |
| `provenance` | Original archive/path/hash, original metadata lookup key, and source authority context. |

`review.metadata_reviewed_on` does not refresh technical claims. A missing original owner or review date remains null. Source approval and scope do not confer authority in another organization.

Original fields, including `applies_to`, `technologies`, source domain lists, tags, and exact YAML, are retained in [original-metadata.json](metadata/original-metadata.json). The normalized schema intentionally uses a smaller set of consistent fields. To retrieve legacy metadata, look up the document path in that file. The complete per-document comparison and content excerpts are in [classification-review.json](metadata/classification-review.json).

The taxonomy is defined in [taxonomy.json](metadata/taxonomy.json) and explained in [TAXONOMY.md](TAXONOMY.md). Synonym aliases help query matching; they are not permission to assign a tag without checking its meaning in the document. For example, model escalation is not the same as human approval, and a vector index is not the same thing as semantic retrieval.

## Maintenance

Install the dependencies in [scripts/requirements.txt](scripts/requirements.txt), then run `python3 scripts/reindex.py`. It normalizes all Markdown, rebuilds catalogs and graphs, and runs the metadata validation gate. Run `python3 scripts/validate_metadata.py` to validate without rewriting.

For imported documents, the reviewed classification is explicit in [classifications.txt](metadata/classifications.txt) and the special-case mappings in [normalize_metadata.py](scripts/normalize_metadata.py). Those mappings are authoritative for this snapshot: edit them when revising tags, rather than only editing a generated front-matter block. New source documents require an explicit classification. Assembly indexes receive navigation tags. Update taxonomy definitions and the schema together when introducing terms.

The classification review is an assistant review of primary topics using purpose, headings, and relevant prose. It is not an expert certification or a technical API revalidation. It favors useful discovery over exhaustive tagging of every incidental mention.
