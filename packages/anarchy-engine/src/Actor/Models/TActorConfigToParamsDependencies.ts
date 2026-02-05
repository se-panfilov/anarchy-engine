import type { TFsmService } from '@hellpig/anarchy-engine/Fsm';
import type { TModels3dService } from '@hellpig/anarchy-engine/Models3d';
import type { TPhysicsBodyService } from '@hellpig/anarchy-engine/Physics';
import type { TSpatialGridRegistry } from '@hellpig/anarchy-engine/Spatial';

export type TActorConfigToParamsDependencies = Readonly<{
  fsmService: TFsmService;
  models3dService: TModels3dService;
  physicsBodyService: TPhysicsBodyService;
  spatialGridRegistry: TSpatialGridRegistry;
}>;
