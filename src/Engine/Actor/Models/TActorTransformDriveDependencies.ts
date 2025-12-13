import type { TLoopService } from '@/Engine/Loop';
import type { TPhysicsBodyService } from '@/Engine/Physics';

export type TActorTransformDriveDependencies = Readonly<{
  loopService: TLoopService;
  physicsBodyService: TPhysicsBodyService;
}>;
