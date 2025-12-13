import type { TKinematicLoop } from '@Anarchy/Engine/Kinematic';

export type TKinematicAgentDependencies = Readonly<{
  kinematicLoop: TKinematicLoop;
}>;
