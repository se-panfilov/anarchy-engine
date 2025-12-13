import type { TFsmService } from '@/Engine/Fsm';
import type { TModels3dService } from '@/Engine/Models3d';
import type { TSpatialGridRegistry } from '@/Engine/Spatial';

export type TActorConfigToParamsDependencies = Readonly<{
  fsmService: TFsmService;
  models3dService: TModels3dService;
  spatialGridRegistry: TSpatialGridRegistry;
}>;
