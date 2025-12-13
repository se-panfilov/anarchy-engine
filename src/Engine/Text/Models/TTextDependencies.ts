import type { TKinematicLoopService } from '@/Engine/Kinematic';

export type TTextDependencies = Readonly<{
  kinematicLoopService: TKinematicLoopService;
}>;
