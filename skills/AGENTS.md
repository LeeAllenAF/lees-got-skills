# Skills Directory — Agent Instructions

This directory contains source skills intended for independent distribution. Follow the repository root `AGENTS.md` and this directory's [CODING_STANDARDS.md](./CODING_STANDARDS.md) when authoring or maintaining skills.

## Working in This Directory

- A skill must remain vendor-agnostic, independently installable, and fully functional when its own directory is copied elsewhere.
- Each skill's `SKILL.md` is its runtime entry point. Its packaged `AGENTS.md` is **consumer-facing guidance only**, not authoring instructions.
- Keep source-repository maintenance instructions in this file and `skills/CODING_STANDARDS.md`, **not** in packaged skill files.
- Do not rely on sibling skills, root documentation, or repository tooling for a skill's required runtime behavior.
- Prefer progressive disclosure: follow local references only when needed, rather than loading every skill's contents.
- Do not assume all agents automatically read skill-level `AGENTS.md`; put activation and essential operational guidance in `SKILL.md` as well.

## Before Editing a Skill

1. Read the skill's own `SKILL.md` and relevant local references; read its `AGENTS.md` for intended consumer usage.
2. Follow any more specific applicable instructions, keeping the consumer-facing role of packaged guidance intact.
3. Preserve portable paths, metadata compatibility, and standalone behavior.

For metadata, packaging, dependency, documentation, and implementation requirements, follow [CODING_STANDARDS.md](./CODING_STANDARDS.md).
