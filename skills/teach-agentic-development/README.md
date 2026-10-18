# Teach Agentic Development

**A local field guide for building agents without summoning a research swarm.**

Teach Agentic Development answers practical questions about agent architecture, context, tools, evaluation, security, operations, and adjacent engineering concerns. It pairs one conversational agent with deterministic lexical retrieval over a bundled, source-attributed corpus.

## Install

Copy the complete `teach-agentic-development` folder into your agent host's supported skills directory. Use Node.js 24 or newer. There are no runtime packages to install, no API keys to configure, and no network services to wake up.

## Use

Try: “When should I split one agent into multiple agents?” Or: “Use teach-agentic-development to explain the difference between context and memory.” You can also request a known document directly by ID.

The skill runs its local CLI, retrieves a bounded evidence set, and explains what that evidence supports. It reuses evidence for follow-ups and makes at most one targeted follow-up retrieval when a real gap remains.

## Included tools

```bash
node scripts/cli.mjs query "When should I use multiple agents?"
node scripts/cli.mjs get AEP-AGENT-004
node scripts/cli.mjs related AEP-AGENT-004
node scripts/cli.mjs check
```

The released archive includes the full source corpus. The compiled index is included separately so ordinary questions do not require reading or rebuilding that corpus.

## Limitations

Retrieval is English lexical search, not semantic search, and may miss paraphrases. The corpus is a historical snapshot whose technical claims have not necessarily been refreshed against current vendor documentation. Treat the answers as grounded teaching material, not a guarantee of current APIs or policies.
