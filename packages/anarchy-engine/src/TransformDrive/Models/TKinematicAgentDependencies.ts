import type { TKinematicLoop } from '@hellpig/anarchy-engine/Kinematic';

export type TKinematicAgentDependencies = Readonly<{
  kinematicLoop: TKinematicLoop;
}>;
