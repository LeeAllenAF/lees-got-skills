---
id: instruction.validation
title: Validation strategy
type: instruction
status: active
tags: ["validation"]
summary: Bounded validation and Nx guardrails
---

# Proportional validation

Start at the smallest useful scope: syntax/changed-file checks, then project-specific lint/typecheck/tests as necessary. `nx affected` is not automatically cheap, particularly for changes to shared config; examine affected targets before executing broad work. No reflexive `nx run-many` or whole-repo builds. Escalate only for material risk, explicit request, or release. Retry only after a relevant fix; stop and report unresolved errors. CI performs full scaffolding integrity for relevant PRs; do not run project-wide validation just to check these documents.
