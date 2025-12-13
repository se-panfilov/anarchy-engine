import type { TModels3dAsyncRegistry } from '@/Engine/Models3d';
import type { TSpatialGridRegistry } from '@/Engine/Spatial';

export type TActorConfigToParamsDependencies = Readonly<{
  spatialGridRegistry: TSpatialGridRegistry;
  models3dRegistry: TModels3dAsyncRegistry;
}>;
