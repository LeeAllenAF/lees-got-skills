# Skill Coding Standards

Applies to source skills in this directory. Inherits root `CODING_STANDARDS.md`; more specific standards override conflicts.

## Portability and Isolation

- Each skill MUST be vendor-agnostic and independently usable when its directory alone is installed.
- Required scripts, references, templates, assets, and other supporting resources MUST live inside that skill directory, with portable relative paths.
- Required sibling-skill, parent-repository, proprietary harness, or provider-specific runtime dependencies are prohibited.
- External runtime prerequisites (for example, Python or Git) MUST be documented; favor standard-library and deterministic implementations where practical.
- Optional integrations MUST degrade gracefully when missing.
- Never commit secrets or machine-specific configuration. Git-ignore caches, temporary files, and generated state, including any created within the skill directory.

## Required Packaged Files

Each skill MUST include:

- `SKILL.md` — canonical portable skill entry point, with specification-compliant `name` and `description` YAML frontmatter.
- `AGENTS.md` — **consumer-only** guidance: when to use the skill, how to use it, caveats, and skill dependencies. No authoring or maintenance guidance.
- `README.md` — human-oriented documentation in the website's fun, slightly quirky, confident yet professional voice; explain purpose, installation, use, prerequisites, and limitations.
- `agents/openai.yaml` — OpenAI/Codex presentation metadata; keep vendor-specific fields outside portable core metadata.

Place supporting material in local folders such as `scripts/`, `references/`, and `assets/` only as needed. Do not add empty placeholder directories.

## Metadata and Skill Dependencies

- Follow the [Agent Skills specification](https://agentskills.io/specification) for `SKILL.md` structure and portable fields.
- Use clear, activation-oriented descriptions; keep skill instructions concise and context-linked.
- Claude-compatible optional frontmatter MAY be used when compatible with the portable core; do not require Claude-specific fields for function.
- Use this **repository-defined**, not vendor-native, YAML frontmatter in the packaged `AGENTS.md`:

  ```yaml
  ---
  dependencies:
    required: []
    optional:
      - skill-name: example-helper
        purpose: Optional enhancement when installed
  ---
  ```

- `required` MUST remain empty for independently distributed skills. Declare optional skill integrations by canonical skill name with a short purpose; use `optional: []` when none exist.
- Do not imply that agents or vendors parse this dependency frontmatter automatically. Explain optional integration behavior in consumer-facing instructions when relevant.
- `SKILL.md` owns execution instructions; `AGENTS.md` provides supplementary consumer guidance. Avoid copying large instruction blocks between them.

## Scripts and References

- Prefer deterministic, readable scripts for repeatable operations.
- Validate inputs, handle failures predictably, and explain actionable errors.
- Avoid surprising network access, destructive behavior, and unnecessary side effects; request appropriate authorization for impactful actions.
- Use context links to local material, ensuring links still work after standalone installation.
- Follow root commenting hygiene and keep instructions and references synchronized with implementation.

## Verification

At a logical completion checkpoint, verify metadata and local paths, check that ignored runtime artifacts are not tracked, and exercise the affected behavior in a standalone skill-directory context when practical. Keep verification targeted and follow the root validation policy; do not introduce separate contract-testing infrastructure.
