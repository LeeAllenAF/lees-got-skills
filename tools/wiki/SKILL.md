---
name: build-corpus-wiki
description: Generate or verify the repository website's wiki data from the canonical top-level corpus. Use when corpus content changes or when working on the website wiki ingestion pipeline.
---
# Build Corpus Wiki

Keep `corpus/` as the only authored source for wiki content. Do not hand-edit files in `apps/website/public/wiki-data/`.

## Workflow

1. Confirm corpus metadata and source files are internally valid using the corpus's own maintenance guidance when the change affects corpus content.
2. Run `node tools/wiki/scripts/build-wiki.mjs build` from the repository root.
3. Review the generated file changes. The generator removes frontmatter and generated corpus navigation, converts resolvable internal Markdown links to `/wiki/:documentId`, and preserves the remaining Markdown as display content.
4. Run `node tools/wiki/scripts/build-wiki.mjs check` to verify that committed website data exactly matches the corpus.
5. For website UI changes, follow `apps/website/AGENTS.md` and its accessibility-review requirement.

The generated data is committed intentionally. Nx consumes only files under the website; neither the website build nor the Nx project graph reads `corpus/`.
