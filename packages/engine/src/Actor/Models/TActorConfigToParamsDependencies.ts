import type { TFsmService } from '@/Fsm';
import type { TModels3dService } from '@/Models3d';
import type { TPhysicsBodyService } from '@/Physics';
import type { TSpatialGridRegistry } from '@/Spatial';

export type TActorConfigToParamsDependencies = Readonly<{
  fsmService: TFsmService;
  models3dService: TModels3dService;
  physicsBodyService: TPhysicsBodyService;
  spatialGridRegistry: TSpatialGridRegistry;
}>;
