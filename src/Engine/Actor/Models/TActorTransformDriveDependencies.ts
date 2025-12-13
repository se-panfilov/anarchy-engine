import type { TKinematicLoopService } from '@/Engine/Kinematic';
import type { TPhysicsBodyService, TPhysicsLoopService } from '@/Engine/Physics';

export type TActorTransformDriveDependencies = Readonly<{
  kinematicLoopService: TKinematicLoopService;
  physicsBodyService: TPhysicsBodyService;
  physicsLoopService: TPhysicsLoopService;
}>;
