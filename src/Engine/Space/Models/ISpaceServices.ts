import type { IEnvMapService } from '@/Engine/EnvMap';
import type { IFogService } from '@/Engine/Fog';
import type { IIntersectionsService } from '@/Engine/Intersections';
import type { IScenesService } from '@/Engine/Scene';

export type ISpaceServices = {
  actorService?: IActorService;
  textService?: ITextService;
  intersectionsService?: IIntersectionsService;
  lightService?: ILightService;
  fogService?: IFogService;
  controlsService?: IControlsService;
  scenesService?: IScenesService;
  rendererService?: IRendererService;
  envMapService?: IEnvMapService;
};
