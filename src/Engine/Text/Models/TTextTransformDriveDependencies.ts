import type { TKinematicLoopService } from '@/Engine/Kinematic';
import type { TPhysicsBodyService, TPhysicsLoopService } from '@/Engine/Physics';

export type TTextTransformDriveDependencies = Readonly<{
  kinematicLoopService: TKinematicLoopService;
  physicsBodyService: TPhysicsBodyService;
  physicsLoopService: TPhysicsLoopService;
}>;
