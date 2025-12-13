import type { TModels3dService } from '@/Engine/Models3d';
import type { TSpatialGridRegistry } from '@/Engine/Spatial';

export type TActorConfigToParamsDependencies = Readonly<{
  spatialGridRegistry: TSpatialGridRegistry;
  models3dService: TModels3dService;
}>;
