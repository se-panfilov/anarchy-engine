import type { TLoopService } from '@Anarchy/Engine/Loop';
import type { TPhysicsBodyService } from '@Anarchy/Engine/Physics';

export type TTextTransformDriveDependencies = Readonly<{
  physicsBodyService: TPhysicsBodyService;
  loopService: TLoopService;
}>;
