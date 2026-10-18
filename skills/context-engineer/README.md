# Context Engineer

Bring receipts. Leave the haystack behind.

Context Engineer helps an agent find the evidence a question needs and package exact passages with paths, line ranges, SHA-256 fingerprints, and reasons for inclusion. Conflicts and missing evidence stay on the page instead of disappearing into a confident summary.

## Install and use

Copy the complete `context-engineer` directory into your agent's skills location, then ask it to use [SKILL.md](SKILL.md). Follow your host's skill discovery rules. No parent repository, bundled corpus, sibling skill, service, credentials, or provider SDK is needed.

Example request: “Use context-engineer to explain how request retries work under this authorized project root. Include implementation and behavioral tests, flag contradictions, and keep the packet below 65,536 UTF-8 bytes.”

The optional packer requires Node.js 22+. With an authorized root and a manifest described in the [contract](references/context-contract.md):

```sh
node /path/to/context-engineer/scripts/pack-context.mjs /authorized/project /path/to/manifest.json
```

Output is stable, pretty-printed JSON on stdout. Errors go to stderr with a nonzero exit status and no success packet. See [examples](references/examples.md) for a complete manifest and decision exercises. Keep manifests and output in your own scratch location, outside the installed skill directory.

## Limits, honestly

Budgets measure bytes, not tokens. Every selected passage must fit; nothing is silently dropped. Local text must be UTF-8 with LF or CRLF line endings. Binary files and control characters are rejected. Source hashes fingerprint complete files, while excerpt hashes fingerprint exact selected text.

The agent chooses relevance and assesses authority and freshness. The tool cannot certify those judgments, infer instruction precedence, detect every misleading summary, or guarantee complete search coverage. Use a stable local source tree: containment checks do not replace operating-system isolation against concurrent hostile filesystem edits. Retrieved commands remain quoted evidence, never permission to execute them.
