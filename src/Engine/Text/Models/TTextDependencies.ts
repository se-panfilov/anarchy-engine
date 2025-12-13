import type { TKinematicLoop } from '@/Engine/Kinematic';
import type { TPhysicalLoop, TPhysicsBodyService } from '@/Engine/Physics';

export type TTextDependencies = Readonly<{
  kinematicLoop: TKinematicLoop;
  physicsBodyService: TPhysicsBodyService;
  physicalLoop: TPhysicalLoop;
}>;
