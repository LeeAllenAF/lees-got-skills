---
schema_version: '1.0'
id: AEP-TOOL-006
title: Authority, Permissions, and Side Effects
summary: 'Authority, Permissions, and Side Effects. Focus: authorization, human approval, least privilege.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- tool-engineering
tags:
- authorization
- human-approval
- least-privilege
scope:
- enterprise-global
related:
- AEP-P-011
- AEP-P-012
- AEP-CTX-002
- AEP-TOOL-001
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 60d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/tools/AEP-TOOL-006-authority-permissions-and-side-effects.md
  original_sha256: 7ed7ed2accbd8e20d4d8bb3d3d324a3c741c09a5d7dcfcddbdcd4b69b909952b
  original_metadata_record: handbook/tools/AEP-TOOL-006-authority-permissions-and-side-effects.md
  authority: inherited-source-context
---

# AEP-TOOL-006 — Authority, Permissions, and Side Effects

## 1. Purpose

A tool grants authority. Security therefore begins before invocation: with deciding which capabilities exist, which identities may call them, which resources they may affect, and which actions require approval.

## 2. Authority is independent of model intelligence

A better model does not justify broader permissions.

The harness and service must enforce authority even if the model requests an invalid or malicious action.

## 3. Recommended side-effect classes

```text
R0  Pure/deterministic local computation
R1  Read-only external access
R2  Reversible/local mutation
R3  External mutation with bounded impact
R4  High-impact / production / communication / financial / destructive
```

Exact labels may evolve, but tools should expose a machine-readable risk/side-effect class.

## 4. Least privilege

Authorization should be scoped to the smallest practical combination of:

- identity;
- tenant/scope;
- resource;
- action;
- environment;
- time;
- purpose where enforceable.

Do not pass broad credentials to the model when a service can hold them and expose a narrower capability.

## 5. Approval boundaries

Approval should occur close to the consequential action and show the user meaningful information:

```text
what will happen
which resources are affected
which identity will perform it
whether it is reversible
important parameters/diff
```

Approval of an abstract plan should not automatically authorize materially different actions later.

## 6. Reads can still be sensitive

Read-only is not equivalent to harmless. Reads may expose secrets, personal data, restricted material, or cross-tenant information.

## 7. Untrusted content cannot expand authority

A webpage, issue, README, email, or tool result must never grant itself additional privileges through embedded instructions.

The authorization layer remains external to model reasoning.

## 8. Write separation

Prefer distinct read/write tools when doing so improves:

- permission scoping;
- approval clarity;
- auditing;
- retry behavior;
- model selection.

## 9. Auditability

High-impact calls should record:

- caller identity;
- agent/session identity;
- tool/version;
- normalized parameters;
- authorization decision;
- approval evidence;
- result/status;
- correlation/operation ID.

Do not log secrets merely for observability.

## 10. Guidance

The model proposes or selects actions; the application authorizes them. Authority must remain enforceable without trusting the model to remember policy.

## References

Primary sources used for this sequence include:

- OpenAI, **Function calling** — https://developers.openai.com/api/docs/guides/function-calling
- OpenAI, **Programmatic Tool Calling** — https://developers.openai.com/api/docs/guides/tools-programmatic-tool-calling
- OpenAI, **Define tools – Plugins** — https://developers.openai.com/plugins/plan/tools
- Model Context Protocol, **2026-07-28 Specification** — https://blog.modelcontextprotocol.io/posts/2026-07-28/
- Model Context Protocol, **Tasks Extension** — https://tasks.extensions.modelcontextprotocol.io/specification/draft/tasks

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-tools.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
- [AEP-CTX-002 — Context Sources and Instruction Hierarchy](../context/AEP-CTX-002-context-sources-and-instruction-hierarchy.md)
- [AEP-TOOL-001 — Tool Design Fundamentals](AEP-TOOL-001-tool-design-fundamentals.md)
- [HARNESS-CODEX-PLUGIN-03-MCP-AND-HOOKS — MCP tooling and lifecycle hooks](../../harness/codex-plugin/03-mcp-and-hooks.md)
