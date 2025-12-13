import type { TLoopService } from '@/Engine/Loop';
import type { TPhysicsBodyService } from '@/Engine/Physics';

export type TTextDependencies = Readonly<{
  loopService: TLoopService;
  physicsBodyService: TPhysicsBodyService;
}>;
