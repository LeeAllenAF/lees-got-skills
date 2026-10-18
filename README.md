<div align="center">
  <img src="apps/website/src/assets/terminal-anglerfish.png" alt="A glowing terminal anglerfish" width="220">

  <h1>GOOD SKILLS.<br>BAD PUNS.<br>BETTER SOFTWARE.</h1>

  <p><strong>Portable agent skills, practical engineering knowledge, and notes from the command line.</strong></p>

  <p>
    <a href="https://lees-got-skills.com">Visit the site</a>
    &nbsp;·&nbsp;
    <a href="https://lees-got-skills.com/wiki">Explore the wiki</a>
    &nbsp;·&nbsp;
    <a href="https://lees-got-skills.com/lab">Open Corpus Lab</a>
    &nbsp;·&nbsp;
    <a href="https://github.com/LeeAllenAF/lees-got-skills/releases">Get a release</a>
  </p>
</div>

---

## `>_ WHAT IS THIS?`

**Lee’s Got Skills** is my workshop for making software agents more useful in the real world. It brings together three things that belong in the same tank:

| | Dive in | What you’ll find |
| --- | --- | --- |
| `</>` | **[Agent Skills](skills/)** | Small, focused capabilities that are independently packaged and built to travel. |
| `⌘` | **[The Corpus](corpus/)** | A structured, source-attributed library about agent architecture, context, tools, evaluation, security, operations, and more. |
| `▤` | **[The Website](apps/website/)** | The public home for the skills catalog, searchable wiki, and dispatches from the experiment. |
| `>_` | **[Corpus Lab](apps/website/CORPUS_LAB.md)** | A bounded, inspectable experiment in pairing deterministic retrieval with one small language model. |

The aim is not to invent another universal agent framework. It is to make practical knowledge easier to find, useful behavior easier to install, and agent work a little less dependent on inspired guessing.

## `◇ SKILLS IN THE TANK`

### [`accessibility-check`](skills/accessibility-check/)

Find the rough edges without hauling around 80 pages of instructions. This skill reviews scoped web code and user journeys against a compact WCAG 2.2 AA synopsis, then reaches for authoritative detail when the evidence calls for it.

### [`teach-agentic-development`](skills/teach-agentic-development/)

A local field guide for building agents without summoning a research swarm. It uses deterministic lexical retrieval over the bundled corpus to answer practical questions with a bounded, inspectable evidence set.

Official releases are available from the **[release page](https://github.com/LeeAllenAF/lees-got-skills/releases)**. Each skill is versioned, validated, and packaged independently of the monorepo around it.

## `⌘ THE WIKI HAS A SOURCE`

The top-level [`corpus/`](corpus/) is the source of truth for the wiki—not a pile of content hidden inside the frontend and not an Nx project. It contains the complete agentic-engineering reference package, including its metadata, taxonomy, indexes, provenance, and deterministic maintenance scripts.

The repository-local [`tools/wiki/`](tools/wiki/) generator turns that corpus into deployable website data. The site reads the generated artifact at runtime, so the same material can serve humans in the wiki and agents through the teaching skill without maintaining two competing copies.

```text
corpus/  ──>  wiki generator  ──>  public/wiki-data/  ──>  /wiki
   └─────>  skill packaging  ──>  teach-agentic-development release
```

## `>_ RUN IT LOCALLY`

This workspace uses **Node.js 24**, **pnpm**, and **Nx**.

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

Useful checks stay deliberately scoped:

```bash
corepack pnpm website:typecheck  # Check the React application
corepack pnpm website:test       # Run website tests
corepack pnpm website:build      # Build the site with committed wiki data
corepack pnpm wiki:check         # Confirm generated wiki data is current
corepack pnpm skills:validate    # Validate every distributable skill
corepack pnpm skills:package     # Build release-ready skill artifacts
```

## `↗ HOW THE REPO IS ORGANIZED`

```text
lees-got-skills/
├── apps/website/                  # React site: skills, wiki, blog, and about
├── corpus/                        # Versioned reference data; outside Nx
├── skills/
│   ├── accessibility-check/       # Portable accessibility review skill
│   └── teach-agentic-development/ # Portable corpus-backed teaching skill
├── tools/
│   ├── skills/                    # Shared validation and packaging tools
│   └── wiki/                      # Corpus-to-website data generator
├── docs/agents/                   # Repository operating guidance
├── AGENTS.md                      # Canonical entry point for agents
└── CODING_STANDARDS.md            # Standards for repository changes
```

## `✦ HOUSE RULES`

- **Curiosity first.** Ask questions, inspect the evidence, and embrace the weird.
- **Deterministic by default.** If a script can answer the question, let the script answer it.
- **Small change, small check.** Validation should be meaningful and proportional—not a ceremonial CPU bonfire.
- **Built to travel.** A released skill should work without dragging this whole repository behind it.
- **Humans keep the steering wheel.** Agents can help build; consequential actions still belong to people.

## `! LICENSING & SECURITY`

This repository is publicly viewable but **not open source**. Officially published skill and plugin releases are free to install and use under the terms in [`LICENCE.md`](LICENCE.md); the repository source remains proprietary.

Found a vulnerability? Please follow [`SECURITY.md`](SECURITY.md) and use GitHub’s private vulnerability-reporting flow. Do not put exploit details or secrets in a public issue.

---

<div align="center">
  <strong>Built under the AlienFish flag.</strong><br>
  <sub>Curious minds welcome. Unnecessary complexity must check its baggage at the dock.</sub>
  <br><br>
  <em>Go deeper.</em> 🐟
</div>
