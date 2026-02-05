import type { TLoopService } from '@hellpig/anarchy-engine/Loop';
import type { TPhysicsBodyService } from '@hellpig/anarchy-engine/Physics';

export type TTextTransformDriveDependencies = Readonly<{
  physicsBodyService: TPhysicsBodyService;
  loopService: TLoopService;
}>;
