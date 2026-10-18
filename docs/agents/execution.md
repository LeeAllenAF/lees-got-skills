# Execution Discipline

Read this guidance before substantial implementation or planning.

## Scope and Method

- Understand relevant behavior and established patterns before changing code.
- Keep edits focused on the requested outcome; avoid unrelated refactors, formatting, dependency updates, or cleanup.
- Prefer existing repository tools, scripts, and conventions over introducing new approaches.
- Prefer deterministic methods to inference where they reliably accomplish the task.
- Group related changes into coherent implementation units rather than creating unnecessary edit-check cycles.
- Preserve existing behavior unless a change is required by the task.

## Proportional Planning

- Implement small, clear tasks directly.
- Use concise plans for multi-step, ambiguous, or risky work.
- Avoid elaborate plans for trivial tasks.
- Revise the approach if newly discovered information materially changes assumptions.

Optimize for the lowest reasonable total cost of producing correct, maintainable code, not simply the fewest actions.
