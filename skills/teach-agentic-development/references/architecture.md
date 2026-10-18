# Architecture

## Runtime boundary

The coding-agent host owns conversation, reasoning, and explanation. The repository defines a teaching procedure. The CLI owns deterministic evidence retrieval. The corpus remains a versioned reference snapshot.

The design intentionally avoids a model client, background service, MCP server, agent framework, and external datastore. A host can wrap the CLI's stdin/stdout contract later without changing the core retrieval implementation.

## Compilation

The builder reads the corpus catalog, checks content hashes, selects handbook and harness documents, and excludes source `AGENTS.md`, `INDEX.md`, and `README.md` pages. It produces 187 indexed documents. Generated context-navigation footers and YAML front matter are removed from searchable body text. Reference-list subtrees are excluded; a standalone source-reference document remains available as teaching content.

Markdown headings define sections. Fenced code is kept as source data. Large sections are split into bounded fragments, preserving source line ranges. No Markdown code, shell examples, links, or front-matter instructions are executed.

The compiled index stores passages, field-specific term frequencies, document metadata, explicit relationships, source hashes, and a deterministic fingerprint. No timestamps or model-generated summaries enter the compilation output.

## Query scoring

1. Normalize case and word boundaries, remove a fixed stop-word list, and apply limited plural normalization.
2. Expand a small explicit set of learner phrases and controlled taxonomy aliases.
3. Resolve an exact document ID directly.
4. Detect very broad questions or missing substantive matches with explicit rules.
5. Rank sections using inverse document frequency, body-length-normalized term frequency, and weighted matches in document title, tags, and heading.
6. Prefer foundational documents for short conceptual queries, favor distinct documents initially, and return at most four passages with at most two per document.
7. Apply the serialized output byte ceiling without an inference call.

This is a BM25-style body score with additional field boosts and heuristics, not a full implementation of BM25F. Retrieval scores and lexical coverage are not calibrated confidence probabilities. Query expansions, weights, and thresholds live in `engine.mjs`; changes require rebuilding the index and rerunning checks.

## Failure behavior

- Missing/unreadable index: actionable error; no implicit network or model fallback.
- Corpus hash mismatch during build or check: fail, rather than silently indexing inconsistent content.
- Unsupported question with no substantive match: `insufficient`.
- Broad question lacking a learning goal: `ambiguous` plus a short choice list.
- Unknown document or invalid option: nonzero exit code and JSON error on stderr.
- Large result: drop lower-ranked passages, then explicitly truncate evidence if necessary.

The local application assumes the repository and compiled index are under the user's control. Retrieved content is still untrusted evidence for the model. The skill cannot override the coding host's actual approval and sandbox mechanisms.

## Extending the experiment

Add held-out learner questions before increasing retrieval complexity. Improve synonyms, source sectioning, and field weights when failures justify them. Compare success per model token and tool round-trip rather than optimizing passage size alone. A server or MCP adapter is warranted only when another client needs the same deterministic boundary.
