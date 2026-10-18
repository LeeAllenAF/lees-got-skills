# Lee's Got Skills — Codex project agents

These are **repository-scoped Codex subagents**. Each standalone TOML in `.codex/agents/` provides a distinct role and explicitly configures model and reasoning effort.

| Agent | Purpose | Model | Reasoning | Gate |
| --- | --- | --- | --- | --- |
| `skill-refiner` | Prepare a skill proposal for implementation | `gpt-5.5` | `high` | Open `type:skill` issue |
| `skill-implementer` | Execute a reviewed skill plan | `gpt-5.5` | `high` | Open, `status:ready`, no `agent:hold`, approved plan |

## Lifecycle

1. A proposal starts `status:proposed`.
2. A human begins refinement; use `status:refinement` while evaluating the plan.
3. The refiner investigates the current repository and proposes an issue comment headed `## Execution plan`. It does **not** move an issue to Ready.
4. A human reviews the plan and explicitly changes its label to `status:ready` (removing the other `status:*` labels).
5. The implementer checks the gate, creates a scoped branch, builds and validates the skill, and prepares a PR for human review.
6. PR merge and issue closure remain human-controlled or governed by existing workflows. `agent:hold` always blocks implementation.

Status labels are mutually exclusive: `proposed`, `refinement`, `ready`, `in-progress`, `review`, `blocked`. No agent should infer readiness from priority alone.

## Invocation

In a Codex session where project subagent discovery is supported:

```text
Use the skill-refiner agent to refine issue #3. Investigate repository patterns,
then give me the execution plan for review. Do not implement.
```

```text
Use the skill-implementer agent to implement issue #3 only if it is open
and labeled status:ready without agent:hold. Produce a PR, do not merge.
```

Custom subagents are distinct from directly selecting a top-level model in Codex. Their discoverability and model overrides can differ across Codex CLI, IDE, and tool-backed environments. **Verify the running agent and effective model/effort in your client before relying on routing.** If a client cannot invoke these agents by name, do not silently substitute a generic agent; update the client or use a documented explicit session configuration instead.

## Configuration

Edit the two TOML files to change `model` and `model_reasoning_effort`. Values must be supported by your installed Codex version and account access. The initial choices are deliberate defaults, not hard-coded platform policy.

No global `.codex/config.toml` is necessary for these two agent definitions. The implementer inherits permitted tools and approval constraints from its invoking environment; it cannot use permissions it wasn't granted.

## Safety and portability

The canonical repository rules remain in root `AGENTS.md`, root `CODING_STANDARDS.md`, and `skills/` instructions. These agent profiles are orchestration-specific wrappers, not additional guidance shipped inside published skills.
