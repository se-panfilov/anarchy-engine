import type { TCollisionsService } from '@Anarchy/Engine/Collisions';
import type { TFsmService } from '@Anarchy/Engine/Fsm';
import type { TLoopService } from '@Anarchy/Engine/Loop';
import type { TModels3dService } from '@Anarchy/Engine/Models3d';
import type { TPhysicsBodyService } from '@Anarchy/Engine/Physics';
import type { TSpatialGridService } from '@Anarchy/Engine/Spatial';
import type { TTransformDriveService } from '@Anarchy/Engine/TransformDrive';

import type { TModel3dToActorConnectionRegistry } from './TModel3dToActorConnectionRegistry';

export type TActorDependencies = Readonly<{
  collisionsService: TCollisionsService;
  fsmService: TFsmService;
  loopService: TLoopService;
  model3dToActorConnectionRegistry: TModel3dToActorConnectionRegistry;
  models3dService: TModels3dService;
  physicsBodyService: TPhysicsBodyService;
  spatialGridService: TSpatialGridService;
  transformDriveService: TTransformDriveService;
}>;

export type TActorServiceDependencies = TActorDependencies;
