export type ReleaseStatus = 'development' | 'released';

export interface Skill {
  readonly name: string;
  readonly description: string;
  readonly version: string;
  readonly releaseStatus: ReleaseStatus;
  readonly agentCompatibility: readonly string[];
  readonly docsUrl: string;
  readonly installUrl: string | null;
  readonly releaseUrl: string | null;
}

export const skills: readonly Skill[] = [
  {
    name: 'accessibility-check',
    description: 'Review user-scoped web code and journeys against a compact WCAG 2.2 AA synopsis, with optional verification against the authoritative W3C Recommendation.',
    version: '0.1.0',
    releaseStatus: 'released',
    agentCompatibility: ['Codex', 'Claude', 'Vendor-neutral'],
    docsUrl: 'https://github.com/LeeAllenAF/lees-got-skills/tree/main/skills/accessibility-check',
    installUrl: 'https://github.com/LeeAllenAF/lees-got-skills/releases/download/accessibility-check%400.1.0/accessibility-check-0.1.0.tar.gz',
    releaseUrl: 'https://github.com/LeeAllenAF/lees-got-skills/releases/tag/accessibility-check%400.1.0',
  },
];
