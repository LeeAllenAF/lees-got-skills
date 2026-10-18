# Validation Discipline

Read this guidance before choosing or running validation commands.

## Checkpoint-Based Validation

1. Inspect the relevant implementation and available verification commands.
2. Complete a coherent change before routinely validating.
3. Choose targeted checks proportional to the change's scope and risk.
4. Repair failures and selectively rerun checks affected by the repairs.
5. Report validation performed and meaningful checks not performed.

## Avoid Redundant Checks

- Do not automatically lint, test, type-check, or build after every edit or small group of edits.
- Prefer affected-file, affected-package, or focused tests over repository-wide checks when sufficient.
- Do not rerun successful checks unless subsequent changes may have invalidated them.
- Avoid overlapping commands that provide substantially the same evidence.
- Do not run full builds as a completion ritual.

Run early focused checks when they meaningfully reduce risk, help diagnose a failure, or avoid substantial wasted implementation effort. Always honor user-requested checks, repository-mandated gates, and higher-priority requirements. Never report an unexecuted check as passed.
