import type { TKinematicLoopService } from '@/Engine/Kinematic';
import type { TPhysicsLoopService } from '@/Engine/Physics';

export type TActorTransformDriveDependencies = Readonly<{
  kinematicLoopService: TKinematicLoopService;
  physicsLoopService: TPhysicsLoopService;
}>;
