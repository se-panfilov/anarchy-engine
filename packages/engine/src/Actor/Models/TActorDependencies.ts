import type { TCollisionsService } from '@/Collisions';
import type { TFsmService } from '@/Fsm';
import type { TLoopService } from '@/Loop';
import type { TModels3dService } from '@/Models3d';
import type { TPhysicsBodyService } from '@/Physics';
import type { TSpatialGridService } from '@/Spatial';
import type { TTransformDriveService } from '@/TransformDrive';

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
