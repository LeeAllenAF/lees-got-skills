# Websites Directory — Agent Instructions

This directory contains React websites and their associated code. Follow the repository root `AGENTS.md` and this directory's [CODING_STANDARDS.md](./CODING_STANDARDS.md), plus any more specific instructions in the website being changed.

## Before Editing

1. Inspect the affected website's existing architecture, design system, component patterns, and available scripts.
2. Reuse established components and patterns before creating new abstractions or introducing dependencies.
3. Keep design, behavior, and accessibility consistent with the existing website unless changes are requested.
4. Follow local directory `AGENTS.md` and `CODING_STANDARDS.md` files encountered along the affected paths.

## Implementation Guidance

- Prefer functional, declarative React code and composition over inheritance.
- Keep reusable UI primitives separate from feature-specific components; colocate feature logic until genuine reuse justifies promotion.
- Match existing framework, styling, routing, data-fetching, and state-management approaches instead of imposing new ones.
- Consider responsive behavior, keyboard access, reduced motion, and meaningful loading/error states.
- Validate at logical checkpoints using the smallest relevant checks, as directed by the root agent validation policy.

For detailed code conventions, follow [CODING_STANDARDS.md](./CODING_STANDARDS.md).
