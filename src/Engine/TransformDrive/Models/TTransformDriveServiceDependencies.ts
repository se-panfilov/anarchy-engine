import type { TLoopService } from '@/Engine/Loop';
import type { TPhysicsBodyService } from '@/Engine/Physics';

export type TTransformDriveServiceDependencies = Readonly<{
  loopService: TLoopService;
  physicsBodyService: TPhysicsBodyService;
}>;
