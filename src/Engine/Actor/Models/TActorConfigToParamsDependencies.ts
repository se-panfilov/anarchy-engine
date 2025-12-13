import type { TAnimationsFsmService } from '@/Engine/Animations';
import type { TModels3dService } from '@/Engine/Models3d';
import type { TSpatialGridRegistry } from '@/Engine/Spatial';

export type TActorConfigToParamsDependencies = Readonly<{
  animationsFsmService: TAnimationsFsmService;
  models3dService: TModels3dService;
  spatialGridRegistry: TSpatialGridRegistry;
}>;
