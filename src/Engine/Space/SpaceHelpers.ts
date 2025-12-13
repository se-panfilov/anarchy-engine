import { ActorAsyncRegistry, ActorFactory, ActorService } from '@/Engine/Actor';
import type { IAppCanvas } from '@/Engine/App';
import { CameraFactory, CameraRegistry, CameraService } from '@/Engine/Camera';
import { ControlService, ControlsFactory, ControlsRegistry } from '@/Engine/Controls';
import { EnvMapService } from '@/Engine/EnvMap';
import { FogFactory, FogRegistry, FogService } from '@/Engine/Fog';
import { IntersectionsService, IntersectionsWatcherFactory, IntersectionsWatcherRegistry } from '@/Engine/Intersections';
import { LightFactory, LightRegistry, LightService } from '@/Engine/Light';
import { LoopService } from '@/Engine/Loop';
import { RendererFactory, RendererRegistry, RendererService } from '@/Engine/Renderer';
import type { ISceneFactory, ISceneRegistry, IScenesService, ISceneWrapper } from '@/Engine/Scene';
import { SceneFactory, SceneRegistry, ScenesService } from '@/Engine/Scene';
import type { ISpaceServices } from '@/Engine/Space/Models';
import { Text2dRegistry, Text3dRegistry, TextFactory, TextService } from '@/Engine/Text';
import { isNotDefined } from '@/Engine/Utils';

export function initSceneService(): IScenesService {
  const sceneFactory: ISceneFactory = SceneFactory();
  const sceneRegistry: ISceneRegistry = SceneRegistry();

  return ScenesService(sceneFactory, sceneRegistry);
}

export function initEntitiesServices(scene: ISceneWrapper, canvas: IAppCanvas): Omit<ISpaceServices, 'scenesService'> {
  return {
    actorService: ActorService(ActorFactory(), ActorAsyncRegistry(), scene),
    cameraService: CameraService(CameraFactory(), CameraRegistry(), scene),
    lightService: LightService(LightFactory(), LightRegistry(), scene),
    fogService: FogService(FogFactory(), FogRegistry(), scene),
    envMapService: EnvMapService(),
    loopService: LoopService(),
    rendererService: RendererService(RendererFactory(), RendererRegistry()),
    textService: TextService(TextFactory(), Text2dRegistry(), Text3dRegistry(), scene),
    intersectionsService: IntersectionsService(IntersectionsWatcherFactory(), IntersectionsWatcherRegistry()),
    controlsService: ControlService(ControlsFactory(), ControlsRegistry(), canvas)
  };
}

export function initServices(canvas: IAppCanvas, buildScenesFn: (scenesService: IScenesService) => ISceneWrapper): ISpaceServices | never {
  const scenesService: IScenesService = initSceneService();
  const scene: ISceneWrapper = buildScenesFn(scenesService);

  if (isNotDefined(scene)) throw new Error(`Cannot find the active scene for space during the services initialization.`);

  return {
    scenesService,
    ...initEntitiesServices(scene, canvas)
  };
}
