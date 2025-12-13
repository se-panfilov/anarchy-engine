import type { TSpatialGridRegistry } from '@/Engine/Spatial';

export type TActorConfigToParamsDependencies = Readonly<{
  spatialGridRegistry: TSpatialGridRegistry;
}>;
