---
schema_version: '1.0'
id: AEP-TOOL-007
title: MCP Architecture
summary: 'MCP Architecture. Focus: mcp, provider portability.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- tool-engineering
tags:
- mcp
- provider-portability
scope:
- enterprise-global
related:
- AEP-P-014
- AEP-P-015
- AEP-CTX-007
- AEP-TOOL-004
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 60d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/tools/AEP-TOOL-007-mcp-architecture.md
  original_sha256: 3e06a5816ed6129a8d4581e848f9f34c4858d5684bca33a8aeb0338a1c9da7fc
  original_metadata_record: handbook/tools/AEP-TOOL-007-mcp-architecture.md
  authority: inherited-source-context
---

# AEP-TOOL-007 — MCP Architecture

## 1. Purpose

Model Context Protocol (MCP) is an interoperability layer for exposing capabilities and context to compatible AI clients. the platform should use MCP where it improves portability and integration, but should not make MCP the owner of domain logic or organizational knowledge.

## 2. Architectural position

```text
Domain systems / knowledge / services
              ↓
      stable application APIs
              ↓
        MCP adapter/server
              ↓
 Codex / Claude / IDE / other permission scopes
```

The MCP layer translates capabilities. Core business logic remains testable and usable without MCP.

## 3. Current protocol direction

The MCP `2026-07-28` release moves the core toward stateless request/response operation, supports optional discovery, cacheable deterministic list responses, header-based routing, hardened authorization, and an extension mechanism. Long-running Tasks are an extension rather than core protocol state.

the platform guidance tied to MCP must therefore always record the target specification version.

## 4. Tools, resources, and prompts

Use MCP primitives according to their semantics rather than modeling everything as a tool.

Conceptually:

- **tools** expose actions/capabilities;
- **resources** expose retrievable contextual material;
- **prompts** expose reusable prompt templates/workflows where supported and appropriate.

The handbook itself may eventually expose guidance primarily as resources/search capabilities while executable operations remain tools.

## 5. Stateless core favors scalable servers

Do not assume sticky sessions or in-memory client state. Persist durable state in appropriate backing systems and make requests self-describing where protocol semantics require it.

## 6. Gateway architecture

For enterprise deployments, an MCP gateway may provide:

- authentication;
- authorization;
- routing;
- rate limiting;
- tenant isolation;
- telemetry;
- policy enforcement;
- tool allowlists;
- version compatibility.

A gateway should not become a place where every domain concern is reimplemented.

## 7. Discovery and caching

The 2026 specification allows list responses such as tools/resources/prompts to carry cache hints and deterministic ordering. This supports progressive disclosure and stable prompt caching.

Treat caches as optimization only; authorization and freshness rules still apply.

## 8. Authorization

MCP transport/protocol authorization does not replace resource-level authorization inside domain services.

Validate identity and scope at every consequential call.

## 9. Vendor portability

MCP is preferred when multiple permission scopes benefit from the same capability, but direct native tools may remain appropriate when:

- only one runtime needs the capability;
- latency is critical;
- MCP adds no interoperability value;
- the provider offers stronger native semantics needed by the workload.

## 10. Guidance

Use MCP as an adapter boundary, not as architecture by default. Adopt it where interoperability, capability reuse, or centralized governance justify the additional layer.

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
- [AEP-CTX-007 — Progressive Disclosure](../context/AEP-CTX-007-progressive-disclosure.md)
- [AEP-TOOL-004 — Tool Discovery and Capability Loading](AEP-TOOL-004-tool-discovery-and-capability-loading.md)
- [HARNESS-CODEX-PLUGIN-03-MCP-AND-HOOKS — MCP tooling and lifecycle hooks](../../harness/codex-plugin/03-mcp-and-hooks.md)
- [HARNESS-ARCHITECTURE-01-INTEGRATION-BOUNDARIES — Integration boundaries and capability comparison](../../harness/architecture/01-integration-boundaries.md)
