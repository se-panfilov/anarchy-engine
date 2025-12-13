import type { TKinematicLoopService } from '@/Engine/Kinematic';

export type TKinematicAgentDependencies = Readonly<{
  kinematicLoopService: TKinematicLoopService;
}>;
