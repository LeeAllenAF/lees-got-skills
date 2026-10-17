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
    name: 'repository-bootstrap',
    description:
      'Installs a small, vendor-neutral agent engineering foundation while preserving existing repository work.',
    version: '1.0.0',
    releaseStatus: 'development',
    agentCompatibility: ['Codex', 'Claude', 'Vendor-neutral'],
    docsUrl:
      'https://github.com/AlienFish/lees-got-skills/tree/main/skills/repository-bootstrap',
    installUrl: null,
    releaseUrl: null,
  },
];
