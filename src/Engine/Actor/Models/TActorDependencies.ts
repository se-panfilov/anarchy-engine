import type { TCollisionsService } from '@/Engine/Collisions';
import type { TFsmService } from '@/Engine/Fsm';
import type { TLoopService } from '@/Engine/Loop';
import type { TModels3dService } from '@/Engine/Models3d';
import type { TPhysicsBodyService } from '@/Engine/Physics';
import type { TSpatialGridService } from '@/Engine/Spatial';

import type { TModel3dToActorConnectionRegistry } from './TModel3dToActorConnectionRegistry';

export type TActorDependencies = Readonly<{
  models3dService: TModels3dService;
  physicsBodyService: TPhysicsBodyService;
  spatialGridService: TSpatialGridService;
  collisionsService: TCollisionsService;
  model3dToActorConnectionRegistry: TModel3dToActorConnectionRegistry;
  fsmService: TFsmService;
  loopService: TLoopService;
}>;

export type TActorServiceDependencies = TActorDependencies;
