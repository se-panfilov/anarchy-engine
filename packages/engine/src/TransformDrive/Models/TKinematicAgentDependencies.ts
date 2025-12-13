import type { TKinematicLoop } from '@/Kinematic';

export type TKinematicAgentDependencies = Readonly<{
  kinematicLoop: TKinematicLoop;
}>;
