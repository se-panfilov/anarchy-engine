import type { TCollisionsLoopService, TCollisionsService } from '@/Engine/Collisions';
import type { TKinematicLoopService } from '@/Engine/Kinematic';
import type { TModels3dService } from '@/Engine/Models3d';
import type { TPhysicsBodyService, TPhysicsLoopService } from '@/Engine/Physics';
import type { TSpatialGridService } from '@/Engine/Spatial';

import type { TModel3dToActorConnectionRegistry } from './TModel3dToActorConnectionRegistry';

export type TActorDependencies = Readonly<{
  models3dService: TModels3dService;
  kinematicLoopService: TKinematicLoopService;
  physicsLoopService: TPhysicsLoopService;
  spatialGridService: TSpatialGridService;
  collisionsLoopService: TCollisionsLoopService;
  collisionsService: TCollisionsService;
  model3dToActorConnectionRegistry: TModel3dToActorConnectionRegistry;
}>;

// TODO 8.0.0. MODELS: remove (use PhysicsTransformAgent instead)
export type TActorWithPhysicsDependencies = TActorDependencies &
  Readonly<{
    physicsBodyService: TPhysicsBodyService;
    physicsLoopService: TPhysicsLoopService;
  }>;

export type TActorServiceDependencies = TActorDependencies & TActorWithPhysicsDependencies;
