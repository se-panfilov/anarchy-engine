import type { TCollisionsLoopService, TCollisionsService } from '@/Engine/Collisions';
import type { TKinematicLoopService } from '@/Engine/Kinematic';
import type { TModels3dService } from '@/Engine/Models3d';
import type { TPhysicsBodyService, TPhysicsLoopService } from '@/Engine/Physics';
import type { TSpatialGridService } from '@/Engine/Spatial';

import type { TModel3dToActorConnectionRegistry } from './TModel3dToActorConnectionRegistry';

export type TActorDependencies = Readonly<{
  models3dService: TModels3dService;
  kinematicLoopService: TKinematicLoopService;
  physicsBodyService: TPhysicsBodyService;
  physicsLoopService: TPhysicsLoopService;
  spatialGridService: TSpatialGridService;
  collisionsLoopService: TCollisionsLoopService;
  collisionsService: TCollisionsService;
  model3dToActorConnectionRegistry: TModel3dToActorConnectionRegistry;
}>;

export type TActorServiceDependencies = TActorDependencies;
