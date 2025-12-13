import type { TActorService } from '@/Engine/Actor';
import type { TCameraService } from '@/Engine/Camera';
import type { TControlsService } from '@/Engine/Controls';
import type { TEnvMapService } from '@/Engine/EnvMap';
import type { IFogService } from '@/Engine/Fog';
import type { IIntersectionsWatcherService } from '@/Engine/Intersections';
import type { ILightService } from '@/Engine/Light';
import type { IMaterialService } from '@/Engine/Material';
import type { TMaterialTextureService } from '@/Engine/MaterialTexturePack';
import type { IParticlesService } from '@/Engine/Particles';
import type { IRendererService } from '@/Engine/Renderer';
import type { TScenesService } from '@/Engine/Scene';
import type { ITextService } from '@/Engine/Text';

export type TSpaceServices = Readonly<{
  actorService: TActorService;
  textService: ITextService;
  cameraService: TCameraService;
  intersectionsWatcherService: IIntersectionsWatcherService;
  lightService: ILightService;
  particlesService: IParticlesService;
  fogService: IFogService;
  controlsService: TControlsService;
  materialService: IMaterialService;
  materialTextureService: TMaterialTextureService;
  scenesService: TScenesService;
  rendererService: IRendererService;
  envMapService: TEnvMapService;
}>;
