---
id: instruction.safety
title: Repository safety and authority
type: instruction
status: active
tags: ["safety"]
summary: Impact-based authorization and secrets
---

# Safety and change authority

Autonomous: routine scoped edits, reads, targeted checks. Justified and documented: dependencies, cross-cutting config, costly validation. Explicit authorization: commit, push, force-push, publishing, deployments, secrets, access policy, destructive migrations. Commit and push are never implicit, and permission for normal push does not cover force push. Protect unrelated user changes, generated outputs, credentials and repository boundaries. Host authorization controls are authoritative; these instructions are not a permission broker.
