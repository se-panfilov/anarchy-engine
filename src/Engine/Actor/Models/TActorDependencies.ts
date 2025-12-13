import type { TCollisionsService } from '@/Engine/Collisions';
import type { TLoopService } from '@/Engine/Loop';
import type { TModels3dService } from '@/Engine/Models3d';
import type { TSpatialGridService } from '@/Engine/Spatial';
import type { TTransformDriveService } from '@/Engine/TransformDrive';

import type { TModel3dToActorConnectionRegistry } from './TModel3dToActorConnectionRegistry';

export type TActorDependencies = Readonly<{
  models3dService: TModels3dService;
  spatialGridService: TSpatialGridService;
  collisionsService: TCollisionsService;
  transformDriveService: TTransformDriveService;
  model3dToActorConnectionRegistry: TModel3dToActorConnectionRegistry;
  loopService: TLoopService;
}>;

export type TActorServiceDependencies = TActorDependencies;
