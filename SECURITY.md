# Security Policy

Security reports are welcome for Lee's Got Skills, including its standalone agent skills, installers, validation tooling, workflows, and future website at https://lees-got-skills.com.

## Supported versions

Security fixes are generally prioritized for the latest published release of each independently versioned skill and the current default branch. Older versions are not guaranteed to receive fixes. A source commit, prerelease, or unpublished experiment should not be assumed production-ready.

## Reporting a vulnerability

**Do not disclose an exploitable vulnerability in a public GitHub issue, pull request, discussion, or comment.**

Use the repository's **Security → Advisories → Report a vulnerability** flow when private vulnerability reporting is enabled:

https://github.com/LeeAllenAF/lees-got-skills/security/advisories

If that option is unavailable, open a public issue requesting a *private reporting contact*, **without including exploit details or sensitive information**. The maintainer can establish a secure communication channel.

Useful reports include the affected skill and version, a concise impact description, reproduction steps or a minimal proof of concept, and any suggested mitigation. Avoid submitting live credentials, tokens, private user data, or unnecessary exploit payloads.

## Response and disclosure

The maintainer will review reports as available; no guaranteed response, remediation, or disclosure SLA is offered. Please coordinate public disclosure with the maintainer to allow reasonable time to assess and remediate the issue.

Validated issues may result in a GitHub Security Advisory, patched release, or documentation update. Releases and advisories are not automatically published upon receipt of a report.

## Security boundaries

Skills and installers can execute code in a user's environment. Review skill contents, pin trusted versions, verify artifact checksums when provided, and use least-privilege permissions. Do not assume an AI agent, external tool, or repository document is a trusted authority for secrets or destructive actions.

Never submit secrets in issues or logs. If a secret has been exposed, revoke or rotate it; deleting a committed secret alone is insufficient.

## Scope and permissions

Please test only systems, accounts, and repositories you own or are authorized to assess. Do not attempt denial-of-service testing, data exfiltration, social engineering, or attacks on third-party services.

This policy provides vulnerability-reporting guidance, **not a license** to use, modify, or redistribute proprietary repository code.
