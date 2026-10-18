# Accessibility Check

**Find the rough edges. Not 80 pages of instructions.**

Accessibility Check is a lightweight, portable review skill for web experiences. Tell your agent what code or path to examine; it loads a bite-sized WCAG 2.2 AA synopsis, checks the official W3C Recommendation when available, and digs into the full criteria only when evidence calls for it.

## Install

Copy this entire `accessibility-check` folder into your agent's supported skills directory. The complete skill lives here; no monorepo, framework, account, API key, or sibling skill is required. Your agent must support the Agent Skills `SKILL.md` convention or be explicitly directed to read it.

## Use

Try: “Use accessibility-check to review the login form and its validation/error states.” Or: “Review this React component for keyboard, labeling, and dialog-focus issues.” Provide access to the relevant source and, for full interaction checks, a runnable interface.

## What it does

It routes code to a small set of likely WCAG concerns, surfaces evidence and fixes, and clearly marks what still needs human or browser-based testing. When live retrieval works, it can reconcile its local synopsis with the official WCAG 2.2 publication. Offline? It says so rather than pretending the standard hasn't changed.

## Limitations

This is **review guidance**, not a WCAG compliance certificate. A scoped code review cannot establish full-page conformance. Assistive-technology, visual, and keyboard checks may require tools or a person beyond what your current agent can access. Automatic synopsis edits depend on workspace write access and the requested authorization.

## References

- [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Agent Skills specification](https://agentskills.io/specification)
