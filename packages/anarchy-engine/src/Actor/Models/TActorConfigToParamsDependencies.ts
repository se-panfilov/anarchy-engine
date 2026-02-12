import type { TFsmService } from '@Anarchy/Engine/Fsm';
import type { TModels3dService } from '@Anarchy/Engine/Models3d';
import type { TPhysicsBodyService } from '@Anarchy/Engine/Physics';
import type { TSpatialGridRegistry } from '@Anarchy/Engine/Spatial';

export type TActorConfigToParamsDependencies = Readonly<{
  fsmService: TFsmService;
  models3dService: TModels3dService;
  physicsBodyService: TPhysicsBodyService;
  spatialGridRegistry: TSpatialGridRegistry;
}>;
