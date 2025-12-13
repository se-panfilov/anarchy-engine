import type { ICameraWrapper } from '@/Engine/Camera';
import type { TControlsRegistry } from '@/Engine/Controls';
import type { TEngine } from '@/Engine/Engine/Models';
import type { TIntersectionsWatcher } from '@/Engine/Intersections';
import type { IKeyboardService } from '@/Engine/Keyboard';
import { KeyboardService } from '@/Engine/Keyboard';
import type { ILoopService, ILoopTimes } from '@/Engine/Loop';
import { LoopService } from '@/Engine/Loop';
import type { IRendererWrapper } from '@/Engine/Renderer';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpace } from '@/Engine/Space';
import { spaceLoop } from '@/Engine/Space/SpaceLoop';
import type { IText2dRenderer, IText3dRenderer } from '@/Engine/Text';
import { isNotDefined } from '@/Engine/Utils';

export function Engine(space: TSpace): TEngine {
  const loopService: ILoopService = LoopService();
  const keyboardService: IKeyboardService = KeyboardService(loopService);

  const { cameraService, rendererService, scenesService, textService, controlsService } = space.services;
  const activeScene: TSceneWrapper | undefined = scenesService.findActive();

  const { text2dRegistry, text3dRegistry } = textService.getRegistries();
  const controlsRegistry: TControlsRegistry = controlsService.getRegistry();
  const renderer: IRendererWrapper | undefined = rendererService.findActive();

  const { text2dRendererRegistry, text3dRendererRegistry } = textService.getRendererRegistries();
  const text2dRenderer: IText2dRenderer | undefined = text2dRendererRegistry.getAll()[0];
  const text3dRenderer: IText3dRenderer | undefined = text3dRendererRegistry.getAll()[0];

  let camera: ICameraWrapper | undefined;

  function start(): void {
    if (isNotDefined(activeScene)) throw new Error('Cannot find an active scene');
    if (isNotDefined(text2dRenderer)) throw new Error('Cannot find an active text2d renderer');
    if (isNotDefined(text3dRenderer)) throw new Error('Cannot find an active text3d renderer');
    if (isNotDefined(renderer)) throw new Error('Cannot find an active renderer');

    cameraService.active$.subscribe((wrapper: ICameraWrapper | undefined): void => void (camera = wrapper));
    loopService.tick$.subscribe(({ delta }: ILoopTimes): void => spaceLoop(delta, camera, renderer, activeScene, text2dRegistry, text3dRegistry, text2dRenderer, text3dRenderer, controlsRegistry));
    loopService.start();
  }

  function stop(): void {
    if (isNotDefined(space)) throw new Error('Engine is not started yet (space is not defined)');
    const { intersectionsWatcherService } = space.services;
    loopService.stop();
    void intersectionsWatcherService.getRegistry().forEach((watcher: TIntersectionsWatcher): void => {
      if (watcher.isStarted) watcher.stop();
    });
  }

  return {
    start,
    stop,
    services: { loopService, keyboardService }
  };
}
