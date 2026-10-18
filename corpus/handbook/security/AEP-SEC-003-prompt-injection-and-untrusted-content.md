---
schema_version: '1.0'
id: AEP-SEC-003
title: Prompt Injection and Untrusted Content
summary: 'Prompt Injection and Untrusted Content. Focus: prompt injection, untrusted content.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- security
tags:
- prompt-injection
- untrusted-content
scope:
- enterprise-global
related:
- AEP-P-012
- AEP-CTX-002
- AEP-EVAL-010
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 60d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/security/AEP-SEC-003-prompt-injection-and-untrusted-content.md
  original_sha256: e7921347b6a8e6dd9f11b401be60c4b4b54852d5060f88018e4ae3dd5ea7191b
  original_metadata_record: handbook/security/AEP-SEC-003-prompt-injection-and-untrusted-content.md
  authority: inherited-source-context
---

# AEP-SEC-003 — Prompt Injection and Untrusted Content

## 1. Purpose
Prompt injection occurs when data presented to a model attempts to become instruction. In agent systems, the danger is not only incorrect text output but unauthorized tool use, disclosure, or persistent contamination.

## 2. Default rule
**External content is data, not authority.** Web pages, issues, emails, documents, code comments, dependency metadata, tool results, and retrieved memories must not silently redefine governing instructions.

## 3. Assume detection is imperfect
Prompt-injection defenses should not depend solely on recognizing malicious strings. Current attacks increasingly resemble social engineering and can be encoded in ordinary-looking content.

## 4. Preferred defenses
- separate trusted instructions from untrusted data;
- reduce untrusted text to structured fields when possible;
- propagate provenance/trust labels;
- restrict the tools available during untrusted-content processing;
- isolate sensitive credentials and network destinations;
- require approval for consequential side effects;
- verify that proposed actions align with user intent independently of the untrusted source.

## 5. Retrieval and coding implications
Repository files are not automatically trusted instructions. A checked-out repository can contain malicious comments, scripts, package hooks, or instructions intended for an agent. Likewise, RAG does not inherently solve prompt injection; it can import the attack into context.

## 6. Security objective
Design so that a successful content-level manipulation has a bounded blast radius.

## 7. Evaluation
Maintain adversarial corpora containing direct, indirect, obfuscated, cross-tool, and persistent injection attempts. Evaluate both model behavior and whether external enforcement prevents harmful actions.

## References
- OpenAI, Understanding prompt injections — https://openai.com/safety/prompt-injections/
- OpenAI, Designing AI agents to resist prompt injection — https://openai.com/index/designing-agents-to-resist-prompt-injection/
- OWASP, Prompt Injection — https://genai.owasp.org/llmrisk/llm01-prompt-injection/

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-security.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
- [AEP-CTX-002 — Context Sources and Instruction Hierarchy](../context/AEP-CTX-002-context-sources-and-instruction-hierarchy.md)
- [AEP-EVAL-010 — Safety, Security, and Adversarial Evaluation](../evals/AEP-EVAL-010-safety-security-and-adversarial-evaluation.md)
