import type { ICameraService } from '@/Engine/Camera';
import type { IFogService } from '@/Engine/Fog';
import type { IIntersectionsService } from '@/Engine/Intersections';
import type { IEnvMapService } from '@/Engine/EnvMap';

export type ISpaceServices = {
  actorService?: IActorService;
  textService?: ITextService;
  cameraService?: ICameraService;
  intersectionsService?: IIntersectionsService;
  lightService?: ILightService;
  fogService?: IFogService;
  controlsService?: IControlsService;
  sceneService?: ISceneService;
  rendererService?: IRendererService;
  envMapService?: IEnvMapService;
};
