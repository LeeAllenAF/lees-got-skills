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

export const skills: readonly Skill[] = [];
