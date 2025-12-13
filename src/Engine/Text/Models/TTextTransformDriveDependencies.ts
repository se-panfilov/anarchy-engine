import type { TKinematicLoop } from '@/Engine/Kinematic';
import type { TPhysicalLoop, TPhysicsBodyService } from '@/Engine/Physics';

export type TTextTransformDriveDependencies = Readonly<{
  kinematicLoop: TKinematicLoop;
  physicsBodyService: TPhysicsBodyService;
  physicalLoop: TPhysicalLoop;
}>;
