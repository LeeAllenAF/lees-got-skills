# Website deployment

The website is configured as a Cloudflare Worker with static assets. Unmatched
paths fall back to `index.html` so client-side routes work when opened directly.
Requests under `/api/lab/*` run through the Worker entry point before static
asset routing. Corpus Lab's AI and SQLite Durable Object bindings are declared
in `wrangler.jsonc`. They are active in isolated staging and production
environments. See [CORPUS_LAB.md](./CORPUS_LAB.md) for its model and budget
boundaries.

## Validate locally

From the repository root:

```sh
pnpm website:deploy:check
```

This builds the site and runs a Wrangler dry run. It does not publish anything
or require Cloudflare authentication.

## Authenticate

Authentication is stored by Wrangler outside the repository:

```sh
pnpm website:login
pnpm --filter @alienfish/website exec wrangler whoami
```

Do not add API tokens or account credentials to this repository.

## Deploy

```sh
pnpm run deploy
```

To run the package script directly, include `run` because `deploy` is also a
pnpm command:

```sh
corepack pnpm --filter @alienfish/website run deploy
```

This builds and publishes the site to its `workers.dev` address and attaches
the custom domains `lees-got-skills.com` and `www.lees-got-skills.com`.
Cloudflare provisions and renews TLS certificates for both custom domains.
The first deployment in an environment with the current configuration also
provisions the SQLite-backed `LabAdmissionController` Durable Object namespace
and activates the Workers AI binding. Staging and production have completed
this migration, and live model calls successfully verified Llama 3.2 access in
both environments. A dry run does not create either remote resource.
