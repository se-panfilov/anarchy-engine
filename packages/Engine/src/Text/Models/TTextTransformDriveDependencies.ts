import type { TLoopService } from '@/Engine/Loop';
import type { TPhysicsBodyService } from '@/Engine/Physics';

export type TTextTransformDriveDependencies = Readonly<{
  physicsBodyService: TPhysicsBodyService;
  loopService: TLoopService;
}>;
