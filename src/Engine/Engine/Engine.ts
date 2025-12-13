import type { World } from '@dimforge/rapier3d';

import type { TCameraWrapper } from '@/Engine/Camera';
import type { TControlsRegistry } from '@/Engine/Controls';
import type { TEngine } from '@/Engine/Engine/Models';
import type { TIntersectionsWatcher } from '@/Engine/Intersections';
import type { TKeyboardService } from '@/Engine/Keyboard';
import { KeyboardService } from '@/Engine/Keyboard';
import type { TLoopTimes } from '@/Engine/Loop';
import type { TRendererWrapper } from '@/Engine/Renderer';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpace } from '@/Engine/Space';
import { spaceLoop } from '@/Engine/Space/SpaceLoop';
import type { TText2dRenderer, TText3dRenderer } from '@/Engine/Text';
import { isNotDefined } from '@/Engine/Utils';

export function Engine(space: TSpace): TEngine {
  const keyboardService: TKeyboardService = KeyboardService(space.services.loopService);

  const { cameraService, rendererService, scenesService, textService, controlsService, physicsBodyService } = space.services;
  const activeScene: TSceneWrapper | undefined = scenesService.findActive();

  const { text2dRegistry, text3dRegistry } = textService.getRegistries();
  const controlsRegistry: TControlsRegistry = controlsService.getRegistry();
  const renderer: TRendererWrapper | undefined = rendererService.findActive();

  const { text2dRendererRegistry, text3dRendererRegistry } = textService.getRendererRegistries();
  const text2dRenderer: TText2dRenderer | undefined = text2dRendererRegistry.getAll()[0];
  const text3dRenderer: TText3dRenderer | undefined = text3dRendererRegistry.getAll()[0];

  let camera: TCameraWrapper | undefined;

  function start(): void {
    if (isNotDefined(activeScene)) throw new Error('Engine: Cannot find an active scene');
    if (isNotDefined(text2dRenderer)) throw new Error('Engine: Cannot find an active text2d renderer');
    if (isNotDefined(text3dRenderer)) throw new Error('Engine: Cannot find an active text3d renderer');
    if (isNotDefined(renderer)) throw new Error('Engine: Cannot find an active renderer');

    cameraService.active$.subscribe((wrapper: TCameraWrapper | undefined): void => void (camera = wrapper));
    const world: World | undefined = physicsBodyService.getWorld();

    space.services.loopService.setBeforeEveryTick(({ delta }: TLoopTimes): void => {
      spaceLoop(delta, camera, renderer, activeScene, text2dRegistry, text3dRegistry, text2dRenderer, text3dRenderer, controlsRegistry, world);
    });
    space.services.loopService.start();
  }

  function stop(): void {
    if (isNotDefined(space)) throw new Error('Engine is not started yet (space is not defined)');
    const { intersectionsWatcherService } = space.services;
    space.services.loopService.stop();
    void intersectionsWatcherService.getRegistry().forEach((watcher: TIntersectionsWatcher): void => {
      if (watcher.isStarted) watcher.stop();
    });
  }

  return {
    start,
    stop,
    services: { keyboardService }
  };
}
