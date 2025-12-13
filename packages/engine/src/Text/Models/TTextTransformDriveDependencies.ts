import type { TLoopService } from '@/Loop';
import type { TPhysicsBodyService } from '@/Physics';

export type TTextTransformDriveDependencies = Readonly<{
  physicsBodyService: TPhysicsBodyService;
  loopService: TLoopService;
}>;
