import type { TCollisionsService } from '@hellpig/anarchy-engine/Collisions';
import type { TFsmService } from '@hellpig/anarchy-engine/Fsm';
import type { TLoopService } from '@hellpig/anarchy-engine/Loop';
import type { TModels3dService } from '@hellpig/anarchy-engine/Models3d';
import type { TPhysicsBodyService } from '@hellpig/anarchy-engine/Physics';
import type { TSpatialGridService } from '@hellpig/anarchy-engine/Spatial';
import type { TTransformDriveService } from '@hellpig/anarchy-engine/TransformDrive';

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
