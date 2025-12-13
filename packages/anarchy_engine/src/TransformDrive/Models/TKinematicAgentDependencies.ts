import type { TKinematicLoop } from '@Engine/Kinematic';

export type TKinematicAgentDependencies = Readonly<{
  kinematicLoop: TKinematicLoop;
}>;
