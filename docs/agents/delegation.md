# Delegation and Model Selection

Read this guidance before spawning subagents or assigning delegated work.

## Whether to Delegate

- Delegate only when the benefit outweighs coordination and inference overhead.
- Complete straightforward tasks directly when that is more efficient.
- Give each subagent a narrow assignment, clear expected outcome, and only relevant context.
- Avoid overlapping assignments, duplicate research, and rediscovery of existing findings.

## Capability-Based Selection

When the active runtime supports selecting subagent models or reasoning effort:

- Select the lowest-cost model that can reliably handle the assignment.
- Use the lowest appropriate reasoning effort for its complexity and risk.
- Reserve higher-capability models or deeper reasoning for ambiguous architecture, difficult debugging, security-sensitive decisions, or similarly demanding work.
- Escalate when observed failure, uncertainty, or complexity warrants it.
- Prefer deterministic tools to additional model inference when practical.

Do not assume that every vendor or runtime exposes model choice, reasoning controls, or subagent creation. The objective is reliable results at a proportionate total cost, not an artificially low model tier.
