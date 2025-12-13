import type { ICameraWrapper } from '@/Engine/Camera';
import type { IControlsRegistry } from '@/Engine/Controls';
import type { IIntersectionsWatcher } from '@/Engine/Intersections';
import type { ILoopService, ILoopTimes } from '@/Engine/Loop';
import { LoopService } from '@/Engine/Loop';
import type { IRendererWrapper } from '@/Engine/Renderer';
import type { ISceneWrapper } from '@/Engine/Scene';
import type { ISpace } from '@/Engine/Space';
import { spaceLoop } from '@/Engine/Space/SpaceLoop';
import type { IText2dRenderer, IText3dRenderer } from '@/Engine/Text';
import { isNotDefined } from '@/Engine/Utils';

export type IEngine = Readonly<{
  start: (space: ISpace) => void;
  stop: () => void;
  services: IEngineServices;
}>;

export type IEngineServices = Readonly<{
  loopService: ILoopService;
}>;

export function Engine(): IEngine {
  const loopService: ILoopService = LoopService();
  let _space: ISpace | undefined;

  function start(space: ISpace): void {
    _space = space;
    const { cameraService, rendererService, scenesService, textService, controlsService } = space.services;
    const activeScene: ISceneWrapper | undefined = scenesService.findActive();
    if (isNotDefined(activeScene)) throw new Error('Cannot find an active scene');
    const { text2dRegistry, text3dRegistry } = textService.getRegistries();
    const controlsRegistry: IControlsRegistry = controlsService.getRegistry();
    const renderer: IRendererWrapper | undefined = rendererService.findActive();

    const { text2dRendererRegistry, text3dRendererRegistry } = textService.getRendererRegistries();
    const text2dRenderer: IText2dRenderer | undefined = text2dRendererRegistry.getAll()[0];
    const text3dRenderer: IText3dRenderer | undefined = text3dRendererRegistry.getAll()[0];
    if (isNotDefined(text2dRenderer)) throw new Error('Cannot find an active text2d renderer');
    if (isNotDefined(text3dRenderer)) throw new Error('Cannot find an active text3d renderer');

    if (isNotDefined(renderer)) throw new Error('Cannot find an active renderer');
    let camera: ICameraWrapper | undefined;
    cameraService.active$.subscribe((wrapper: ICameraWrapper | undefined): void => void (camera = wrapper));
    loopService.tick$.subscribe(({ delta }: ILoopTimes): void => spaceLoop(delta, camera, renderer, activeScene, text2dRegistry, text3dRegistry, text2dRenderer, text3dRenderer, controlsRegistry));
    loopService.start();
  }

  function stop(): void {
    if (isNotDefined(_space)) throw new Error('Engine is not started yet (space is not defined)');
    const { intersectionsWatcherService } = _space.services;
    loopService.stop();
    void intersectionsWatcherService.getRegistry().forEach((watcher: IIntersectionsWatcher): void => {
      if (watcher.isStarted) watcher.stop();
    });
  }

  return {
    start,
    stop,
    services: { loopService }
  };
}
