import type { TCollisionsLoopService, TCollisionsService } from '@/Engine/Collisions';
import type { TKinematicLoopService } from '@/Engine/Kinematic';
import type { TModels3dService } from '@/Engine/Models3d';
import type { TPhysicsBodyService, TPhysicsLoopService } from '@/Engine/Physics';
import type { TSpatialGridService, TSpatialLoopService } from '@/Engine/Spatial';

import type { TModel3dFacadeToActorConnectionRegistry } from './TModel3dFacadeToActorConnectionRegistry';

export type TActorDependencies = Readonly<{
  models3dService: TModels3dService;
  kinematicLoopService: TKinematicLoopService;
  spatialLoopService: TSpatialLoopService;
  spatialGridService: TSpatialGridService;
  collisionsLoopService: TCollisionsLoopService;
  collisionsService: TCollisionsService;
  model3dFacadeToActorConnectionRegistry: TModel3dFacadeToActorConnectionRegistry;
}>;

export type TActorWithPhysicsDependencies = TActorDependencies &
  Readonly<{
    physicsBodyService: TPhysicsBodyService;
    physicsLoopService: TPhysicsLoopService;
  }>;

export type TActorServiceDependencies = TActorDependencies & TActorWithPhysicsDependencies;
