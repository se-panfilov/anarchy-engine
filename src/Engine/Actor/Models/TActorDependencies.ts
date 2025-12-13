import type { TCollisionsLoop, TCollisionsService } from '@/Engine/Collisions';
import type { TFsmService } from '@/Engine/Fsm';
import type { TKinematicLoop } from '@/Engine/Kinematic';
import type { TModels3dService } from '@/Engine/Models3d';
import type { TPhysicalLoop, TPhysicsBodyService } from '@/Engine/Physics';
import type { TSpatialGridService } from '@/Engine/Spatial';

import type { TModel3dToActorConnectionRegistry } from './TModel3dToActorConnectionRegistry';

export type TActorDependencies = Readonly<{
  models3dService: TModels3dService;
  physicsBodyService: TPhysicsBodyService;
  spatialGridService: TSpatialGridService;
  collisionsService: TCollisionsService;
  model3dToActorConnectionRegistry: TModel3dToActorConnectionRegistry;
  fsmService: TFsmService;
  kinematicLoop: TKinematicLoop;
  collisionsLoop: TCollisionsLoop;
  physicalLoop: TPhysicalLoop;
}>;

export type TActorServiceDependencies = TActorDependencies;
