# Lee’s Got Skills. Allegedly. 🐟

*An AlienFish experiment in teaching software agents a few good habits before giving them the keys to the keyboard.*

Welcome to **lees-got-skills**: part workshop, part laboratory, part ongoing argument with the idea that an AI assistant should need seventeen paragraphs of encouragement to run a linter.

We’re building a collection of **portable, independently packaged skills for coding agents**, along with the little bits of engineering infrastructure that make those skills useful beyond a carefully staged demo.

The first experiment is delightfully circular: **a repository-bootstrap skill that helps repositories become better places for agents to work—including this one.** If it succeeds, it should be able to leave the nest and bootstrap another repo without dragging all of AlienFish’s tooling along for the ride.

## The aquarium rules

**Vendor-neutral by design.** Codex, Claude, and whoever shows up next should be able to participate without becoming the source of truth.

**Less guessing, more knowing.** When a script can answer a question deterministically, the agent should use the script instead of conducting a philosophical symposium about `package.json`.

**Small changes deserve small checks.** Fixing a typo should not launch an Nx-wide festival of CPU utilization. Validation matters; proportion matters too.

**A skill should travel light.** Each skill should be discoverable, versioned, testable, and packaged to work independently of its birthplace.

**Humans keep the steering wheel.** Agents can help build things. They do not get to quietly publish, deploy, force-push, or turn a small task into a heroic refactor.

## What lives here?

The planned layout looks a little like this:

```text
lees-got-skills/
├── skills/          # Portable skills, individually packaged
├── .agent/          # Generated indexes, plans, and installation state
├── skills/repository-guidelines/
│   └── ...          # Canonical guidance and its supporting tools
├── apps/            # Future apps, including a development blog
├── packages/        # Shared code as the ecosystem grows
├── AGENTS.md        # Agent entrypoint, generated from canonical guidance
└── CLAUDE.md        # Another entrypoint, same underlying principles
```

Some of these paths are **design targets**, not a claim that every feature is already live. This repo is being built in public-facing increments, not unveiled from a smoke machine as a finished platform.

## The first fish in the tank

**`repository-bootstrap`** is the first planned distributable skill. Its mission:

1. Look before touching anything.
2. Explain what it intends to change.
3. Install a small, portable agent-engineering foundation.
4. Verify the important things without testing the entire universe.
5. Leave existing work alone, especially when it belongs to somebody else.

If the skill isn't packaged or released yet, that's not a mystery—it's a milestone we're working toward. Development and publication are separate steps.

## What this isn't

This is not a new universal agent framework, a replacement for Nx, or a shrine to whichever model happens to be fashionable this week. We're interested in boringly reliable mechanics with enough personality to keep the work fun.

## Dispatches from the deep

Eventually, a website inside this repository will publish a development blog documenting the experiments, wrong turns, design decisions, and lessons learned as they happen. The plan is for an agent to help draft those posts from curated, human-reviewed development notes—not invent a triumphant history after the fact.

Until then, consider this README a message in a bottle from the early days.

---

**Built under the AlienFish flag.** Curious minds welcome. Unnecessary complexity must check its baggage at the dock.

*Go deeper.* 🐟
