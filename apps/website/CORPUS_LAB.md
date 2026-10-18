# Corpus Lab architecture

Corpus Lab is a tmux-inspired teaching interface at `/lab`. It uses the canonical top-level corpus through a deterministic, build-time-compiled retrieval index. The single-model integration is deployed to production at `https://lees-got-skills.com/lab` and separately to staging at `https://staging.lees-got-skills.com/lab`.

## Current request path

```text
browser command
├── help / sources / context / stats / clear   client-only, zero inference
├── inspect <id>                               Worker exact lookup, zero inference
└── ask <question>                             Worker lexical retrieval
    ├── ambiguous / insufficient               explicit result, zero inference
    └── found                                  durable admission controller
        ├── app budget / visitor limit         explicit 429, zero inference
        ├── controller unavailable             fail-closed 503, zero inference
        └── admitted                           one bounded model invocation
            ├── valid allowed citations        answer + evidence + telemetry
            └── quota/capacity/invalid output  explicit error, no retry/fallback
```

The Worker never accepts HTML, arbitrary URLs, tools, or model names from the browser. Questions are limited to 500 characters, JSON request bodies are read through a 2 KB streaming ceiling, evidence is limited to four passages and 12 KB, the final model prompt is limited to 20 KB, and source links are constructed from validated corpus document IDs.

## Compiled retrieval

`node tools/lab/scripts/build-lab-index.mjs build` first checks the teaching skill's source index against the canonical corpus. It then emits a compact Worker-safe read-only index with tuple records, flattened postings, and score values quantized to three decimal places. The compact representation reduced the artifact from approximately 2.45 MB to 1.33 MB while retaining all authored retrieval results. No runtime filesystem, vector database, generated summaries, or editorial corpus copy is used.

Run `pnpm lab:check` to verify that the committed lab index is current. Retrieval parity is tested against all authored teaching-skill cases.

## Single-model boundary

The only configured model is `@cf/meta/llama-3.2-3b-instruct`. It receives the question and bounded retrieved passages as untrusted data, has no tools, emits at most 256 tokens, and is aborted after 12 seconds. There is no retry and no second-model fallback.

Every non-empty answer line must end with one or more citations. The server rejects empty output, tool calls, URLs, overlong output, missing citations, and citations outside the selected evidence. `INSUFFICIENT_EVIDENCE` is the model's only accepted uncited response.

## Admission and privacy

A SQLite-backed Durable Object is the coordination atom for the lab's account-wide inference budget. It allows no more than 80 admissions or 8,800 reserved neuron estimates per UTC day. Each admission reserves 110 neurons based on the fixed prompt/output ceilings, leaving a 1,200-neuron margin below the documented 10,000-neuron free allocation. Reservations are intentionally not refunded after failures.

Visitors are limited to four admissions per ten minutes and twelve per UTC day. The controller derives a daily rotating HMAC from the connecting address and a bounded user-agent value. Its random HMAC key lives only in Durable Object storage; raw addresses, user agents, and questions are not persisted or written to application logs.

The app records only whether the provider quota was observed available after a successful call or exhausted after Cloudflare error `3036`. Until one of those events occurs, the UI honestly displays `quota unknown`.

As verified against Cloudflare documentation on October 18, 2026, Workers AI includes a 10,000-Neuron daily free allocation, resets at 00:00 UTC, and fails further operations after exhaustion. The selected model is not in Cloudflare's paid-method-only list. The repository owner confirmed that this account uses Workers Free with no payment method on file. Durable Objects on Workers Free fail after their free limits rather than producing overage charges.

Model execution requires the account to accept any applicable Llama 3.2 terms. Cloudflare reports missing acceptance as error `5016`. Live staging and production inferences succeeded on October 18, 2026, confirming that the account can use the configured model and that provider quota was available.

The staging and production rollouts each provisioned an isolated SQLite-backed `LabAdmissionController` Durable Object and Workers AI binding. The successful production probe used one model invocation, returned validated citations, and recorded provider quota as `observed_available`. Diagnostic probes are intentionally retained as admissions; reservations are not refunded after validation failures.

## Local verification

```bash
pnpm lab:build
pnpm --filter @alienfish/website cf-types
pnpm website:typecheck
pnpm website:test
pnpm website:build
pnpm website:deploy:check
```

The deployment check is a Wrangler dry run. Do not run a real deployment as part of local verification.

The October 18, 2026 local startup profile measured 10.0 ms of active CPU after index compaction. The authorized staging deployments reported 2–3 ms Worker startup time, observed staging request logs reported no more than 5 ms of Worker CPU during the diagnostic rollout, and the production deployment reported 2 ms startup time.

## Current screenshots

- [Desktop retrieved-evidence state](design/corpus-lab-desktop.png)
- [Mobile initial state](design/corpus-lab-mobile.png)
