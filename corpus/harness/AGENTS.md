---
schema_version: '1.0'
id: HARNESS-AGENTS
title: Instructions for Codex agents consuming this corpus
summary: 'Instructions for Codex agents consuming this corpus. Focus: harness design, index navigation.'
type: instruction
status: informational
version: 1.0.0
collection: harness
domains:
- harness-architecture
tags:
- harness-design
- index-navigation
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
  original_path: agentic-harness-foundations/AGENTS.md
  original_sha256: 6fe64de41437fe2484443fd2203ce058639af6bd2f4c47681b5e235199845297
  original_metadata_record: harness/AGENTS.md
  authority: reference-only
---
# Instructions for Codex agents consuming this corpus

This directory is a **reference knowledge pack**, not a runnable plugin. Use its Markdown for design discussion and feasibility analysis.

1. Read [INDEX.md](INDEX.md) and the topic(s) relevant to the request. Follow relative links for supporting context.
2. Separate **documented product capabilities**, **engineering recommendations**, and **unverified assumptions**. Preserve the `[DOCUMENTED]`, `[DESIGN]`, `[VERIFY]` distinctions.
3. Cite the closest local file path and, when making external capability claims, its corresponding official reference in [reference/SOURCES.md](reference/SOURCES.md).
4. Do not assume OpenAI API keys, Agents API access, or access to every model / reasoning effort.
5. Prefer TypeScript, explicit contracts, deterministic ingestion and execution, tool-level permissions, durable state, evidence provenance, and bounded agentic reasoning where appropriate; treat these as starting preferences rather than universal requirements.
6. Do not conflate an MCP server (a tool provider), a plugin (packaging), a skill (guidance), a Codex SDK thread (programmatic runtime), or an App Server connection (bidirectional protocol).
7. Do not invent plugin manifests, protocol methods, SDK options, or hook names; verify current specifications before producing executable implementations.
8. If discussing an implementation, identify where reasoning is invoked, where state persists, and who owns each security or approval decision.
9. When facts conflict, favor installed-package types and current official documentation over this dated snapshot; note divergences.
10. This pack is portable: do not depend on personal context, internal repositories, or external credentials.

Begin with [architecture/01-integration-boundaries.md](architecture/01-integration-boundaries.md) when answering architecture questions.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../indexes/harness-overview.md) · [All topics](../INDEX.md) · [Reading paths](../READING-PATHS.md)

Use the topic index for adjacent documents.
