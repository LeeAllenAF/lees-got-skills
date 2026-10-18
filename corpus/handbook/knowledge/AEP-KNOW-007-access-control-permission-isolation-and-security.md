---
schema_version: '1.0'
id: AEP-KNOW-007
title: Access Control, Permission Isolation, and Security
summary: 'Access Control, Permission Isolation, and Security. Focus: authorization, data isolation.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- knowledge-systems
tags:
- authorization
- data-isolation
scope:
- portable-reference
related: []
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 60d
  owner: null
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/knowledge/AEP-KNOW-007-access-control-permission-isolation-and-security.md
  original_sha256: c5433ad6b7dbdc41ed32271f578cf57923af0f02b5a84487e346629c360970d1
  original_metadata_record: handbook/knowledge/AEP-KNOW-007-access-control-permission-isolation-and-security.md
  authority: inherited-source-context
---

# Access Control, Permission Isolation, and Security

## Principle

Authorization applies **before retrieval**, not after the model sees the result.

## Scope hierarchy

Potential knowledge scopes include:

```text
public
the platform internal
scope-specific
project/repository-specific
restricted/security-sensitive
```

## Query enforcement

The caller's identity and claims determine which corpus/index partitions can participate in retrieval.

Do not:

```text
search everything
   ↓
rank results
   ↓
remove unauthorized documents
```

Prefer:

```text
authorize scope
   ↓
retrieve only permitted corpus
```

## MCP security

MCP exposure introduces an integration boundary.

Current MCP/OpenAI guidance reinforces:

- narrow allowed tool surfaces;
- explicit approval for sensitive operations;
- OAuth/authorization for private data;
- distrust of arbitrary remote MCP servers;
- careful handling of tool outputs as potentially untrusted content.

The handbook knowledge MCP should initially expose read-only capabilities.

## Tenant isolation

Scoped knowledge should use strong tenant boundaries in:

- storage;
- indexes;
- cache keys;
- logs/traces;
- vector namespaces;
- task handles;
- authorization claims.

## Sensitive knowledge

Security runbooks, credentials, secrets, or restricted enterprise material should not be placed into a broad semantic index merely because indexing is convenient.

## Audit

Log:

```text
identity
query/tool
scope
documents returned
resolved guidance IDs
version/index snapshot
timestamp
```

without logging sensitive payloads unnecessarily.

## Current recommendation

Start internal-only and read-only. Earn broader exposure after authorization, isolation, and adversarial evals are proven.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-knowledge.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

Use the topic index for adjacent documents.
