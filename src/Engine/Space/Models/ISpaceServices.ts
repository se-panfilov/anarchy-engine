import type { IActorService } from '@/Engine/Actor';
import type { ICameraService } from '@/Engine/Camera';
import type { IControlsService } from '@/Engine/Controls';
import type { IEnvMapService } from '@/Engine/EnvMap';
import type { IFogService } from '@/Engine/Fog';
import type { IIntersectionsService } from '@/Engine/Intersections';
import type { ILightService } from '@/Engine/Light';
import type { ILoopService } from '@/Engine/Loop';
import type { IRendererService } from '@/Engine/Renderer';
import type { IScenesService } from '@/Engine/Scene';
import type { ITextService } from '@/Engine/Text';

export type ISpaceServices = {
  actorService: IActorService;
  textService: ITextService;
  cameraService: ICameraService;
  intersectionsService: IIntersectionsService;
  lightService: ILightService;
  fogService: IFogService;
  controlsService: IControlsService;
  scenesService: IScenesService;
  rendererService: IRendererService;
  envMapService: IEnvMapService;
  loopService: ILoopService;
};
