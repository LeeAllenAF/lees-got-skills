# Website deployment

The website is configured as a Cloudflare Worker with static assets. Unmatched
paths fall back to `index.html` so client-side routes work when opened directly.

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
