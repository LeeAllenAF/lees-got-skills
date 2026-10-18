# Lee's Got Skills — Codex project agents

These are **repository-scoped Codex subagents**. Each standalone TOML in `.codex/agents/` provides a distinct role and explicitly configures model and reasoning effort.

| Agent | Purpose | Model | Reasoning | Gate |
| --- | --- | --- | --- | --- |
| `skill-refiner` | Prepare a skill proposal for implementation | `gpt-6-luna` | `xhigh` | Open `type:skill` with `status:proposed` or `status:refinement`, no hold |
| `skill-implementer` | Execute a reviewed skill plan | `gpt-6.1-sol` | `medium` | Open, `status:ready`, no `agent:hold`, approved plan |

## Lifecycle and authorization

Every issue must have exactly one `type:*` label and one `status:*` label. Both agents operate on `type:skill` only; `agent:hold` prevents either agent from proceeding. Agents re-read issue state before writes and preserve unrelated labels. Transitions require authorized GitHub issue-write access, with results verified; agents must never claim writes that did not occur.

| Current state | Responsible party | Transition | Conditions |
| --- | --- | --- | --- |
| `status:proposed` | Refiner | `status:refinement` | User authorizes refinement; valid open skill issue |
| `status:refinement` | Refiner | Remains in refinement | Publishes dated evidence-backed `## Execution plan` comment for human review |
| `status:refinement` | Human | `status:ready` | Explicitly approves the current plan; old status removed |
| `status:ready` | Implementer | `status:in-progress` | Approved plan, valid labels, no hold; work can begin |
| `status:in-progress` | Implementer | `status:review` | Tests/validation complete, changes pushed, PR created |
| `status:refinement` or `status:in-progress` | Owning agent | `status:blocked` | Material blocker documented and verified |
| `status:review` | Human / established workflow | Closed | Merge and completion verified |

Only an authorized human may set `status:ready`, clear `agent:hold`, or approve/merge a PR. Neither agent closes issues. A `status:blocked` issue must be reviewed and explicitly restored to the appropriate lifecycle state before work resumes.

**Safety:** Issue-label writes must retain all non-status labels. Re-read the issue and detect concurrent changes immediately before modifying labels. If safe transitions cannot be performed with available tools or permissions, stop/report rather than using stale whole-label replacements. A proposed plan awaiting human approval is not a blocker.

## Model configuration

- Refiner: `gpt-6-luna`, `xhigh`.
- Implementer: `gpt-6.1-sol`, `medium`.

These are the user's chosen settings. Model availability and effective reasoning configuration must be tested in the specific Codex client; the repository cannot guarantee entitlement.

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
