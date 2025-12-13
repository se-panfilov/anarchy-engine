import type { TActorService } from '@/Engine/Actor';
import type { TCameraService } from '@/Engine/Camera';
import type { TControlsService } from '@/Engine/Controls';
import type { TEnvMapService } from '@/Engine/EnvMap';
import type { TFogService } from '@/Engine/Fog';
import type { TIntersectionsWatcherService } from '@/Engine/Intersections';
import type { TLightService } from '@/Engine/Light';
import type { TMaterialService } from '@/Engine/Material';
import type { TMaterialTextureService } from '@/Engine/MaterialTexturePack';
import type { IParticlesService } from '@/Engine/Particles';
import type { IRendererService } from '@/Engine/Renderer';
import type { TScenesService } from '@/Engine/Scene';
import type { ITextService } from '@/Engine/Text';

export type TSpaceServices = Readonly<{
  actorService: TActorService;
  textService: ITextService;
  cameraService: TCameraService;
  intersectionsWatcherService: TIntersectionsWatcherService;
  lightService: TLightService;
  particlesService: IParticlesService;
  fogService: TFogService;
  controlsService: TControlsService;
  materialService: TMaterialService;
  materialTextureService: TMaterialTextureService;
  scenesService: TScenesService;
  rendererService: IRendererService;
  envMapService: TEnvMapService;
}>;
