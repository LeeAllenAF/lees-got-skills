# React Website Coding Standards

Applies to React websites in this directory. Inherits root `CODING_STANDARDS.md`; more specific standards override conflicts.

## React and TypeScript

- Prefer TypeScript for new code unless an existing website intentionally uses another language.
- Write functional React components and favor composition over inheritance.
- Keep components small enough to understand and give them focused responsibilities.
- Prefer readable, explicit props; avoid sprawling boolean-option APIs and deeply nested JSX.
- Use the website's existing React, routing, build, and data-fetching conventions. Do not introduce frameworks or libraries without a demonstrated need.

## Components and Organization

- Reuse existing UI and design-system components before implementing new ones.
- Separate reusable UI primitives (such as buttons, fields, and layout elements) from feature-specific compositions.
- Colocate feature-specific components, hooks, styles, and tests until reuse makes extraction worthwhile.
- Organize shared concerns coherently; avoid artificial directory hierarchies or placeholder abstractions.
- Keep business and orchestration logic distinct from purely presentational components where doing so improves clarity.

## Functional Programming and State

- Prefer pure functions, immutable updates, declarative transformations, and predictable data flow.
- Do not mutate React props or state directly; isolate necessary side effects.
- Keep state local where practical and derive values rather than duplicating state.
- Use effects to synchronize with external systems, not to compute values readily derived during rendering.
- Extract hooks for genuinely reusable stateful behavior, not merely to move code around.
- Use memoization only when meaningful performance or identity requirements justify it.

## Design, Styling, and Accessibility

- Follow the repository's [Web Accessibility Engineering Policy](../../docs/agents/accessibility.md) for every user-facing change.
- Preserve the site's branding, design tokens, component language, and established styling approach.
- Prefer reusable styles and tokens over duplicated or arbitrary values.
- Build responsive layouts that work across relevant screen sizes and input types.
- Use semantic HTML, native interactive controls, accessible labels, and visible keyboard focus.
- Respect reduced-motion preferences; supply meaningful alternative text for informational images.
- Introduce ARIA only when native semantics are insufficient.

## Reliability, Security, and Performance

- Handle meaningful loading, error, empty, and success states.
- Treat external data and user input as untrusted; avoid unsafe HTML injection.
- Never expose secrets or sensitive configuration in client-side bundles or logs.
- Clean up listeners, subscriptions, and other external resources.
- Avoid speculative optimizations, unnecessary client-side dependencies, and oversized assets; optimize when justified.

## Testing and Validation

- Prefer behavior-focused tests over implementation-detail assertions or brittle snapshots.
- When available, favor accessible UI queries and tests of meaningful interactions.
- Run focused checks at logical checkpoints, not after every edit; follow the root validation policy.
