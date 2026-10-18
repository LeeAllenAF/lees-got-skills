# Testing the learning experience

## Automated checks

Run `node scripts/cli.mjs check`, `node --test test/knowledge.test.mjs`, and `node scripts/evaluate.mjs`. Together they verify index/source hashes, seven behavioral tests, and twenty authored retrieval smoke cases. A fixture passes when the expected status is returned and at least one relevant document appears in the result. It does not require every returned passage to be relevant, assess answer generation, or prove teaching quality.

`node scripts/evaluate.mjs` reports result bytes and in-process query milliseconds. These timings exclude process startup and index loading. They are local measurements, not performance guarantees. The retrieval tool uses zero inference calls by construction.

## Manual host experiment

Use the same model and host settings for both conditions. Start fresh sessions to avoid evidence leakage between conditions.

1. Baseline: let the host answer from the corpus using ordinary repository exploration.
2. Treatment: load the repository teaching skill and use its deterministic retrieval workflow.
3. Ask the same ten to twenty learner questions, including comparisons, vague prompts, source lookup, unsupported subjects, and follow-ups.
4. Record host-reported input/output tokens, tool calls, elapsed time, and whether the answer helped the learner. If the host does not expose tokens, mark that value unavailable rather than estimating it from bytes.
5. Review citation support, conceptual correctness, important omissions, and whether the agent admitted missing evidence. Check provider-specific claims separately against authoritative current sources.
6. Repeat enough examples to distinguish a systematic benefit from one good conversation. Keep a held-out question set when adjusting retrieval rules.

Record results locally using [evals/session-results.template.json](evals/session-results.template.json). It is a manual measurement template. The skill does not capture conversation content or send anything externally.

Useful starter prompts:

- When should I use multiple agents instead of one?
- Explain the difference between context, memory, and durable state.
- How are skills different from MCP tools?
- Why shouldn't an agent decide its own permissions?
- How would I know whether a retrieval change improved the system?
- Give an illustrative example of idempotency in a worker queue.
- Explain agents. *(Should ask for a narrower learning goal.)*
- How do I bake sourdough bread? *(Should identify the corpus gap.)*

A follow-up such as “give me an example of that” should reuse existing evidence when sufficient. A request introducing a new concept should retrieve new evidence. Review these behaviors in the actual host; prose instructions alone do not guarantee compliance.
