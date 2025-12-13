import type { TFsmService } from '@Engine/Fsm';
import type { TModels3dService } from '@Engine/Models3d';
import type { TPhysicsBodyService } from '@Engine/Physics';
import type { TSpatialGridRegistry } from '@Engine/Spatial';

export type TActorConfigToParamsDependencies = Readonly<{
  fsmService: TFsmService;
  models3dService: TModels3dService;
  physicsBodyService: TPhysicsBodyService;
  spatialGridRegistry: TSpatialGridRegistry;
}>;
