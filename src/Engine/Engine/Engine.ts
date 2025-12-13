import type { TEngine } from '@/Engine/Engine/Models';
import type { TIntersectionsWatcher } from '@/Engine/Intersections';
import type { TKeyboardService } from '@/Engine/Keyboard';
import { KeyboardService } from '@/Engine/Keyboard';
import type { TLoop } from '@/Engine/Loop';
import type { TRendererWrapper } from '@/Engine/Renderer';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpace } from '@/Engine/Space';
import type { TText2dRenderer, TText3dRenderer } from '@/Engine/Text';
import { isNotDefined } from '@/Engine/Utils';

export function Engine(space: TSpace): TEngine {
  const keyboardService: TKeyboardService = KeyboardService(space.loops.keyboardLoop);

  const { rendererService, scenesService, textService } = space.services;
  const activeScene: TSceneWrapper | undefined = scenesService.findActive();

  const renderer: TRendererWrapper | undefined = rendererService.findActive();

  const { text2dRendererRegistry, text3dRendererRegistry } = textService.getRendererRegistries();
  const text2dRenderer: TText2dRenderer | undefined = text2dRendererRegistry.getAll()[0];
  const text3dRenderer: TText3dRenderer | undefined = text3dRendererRegistry.getAll()[0];

  function start(): void {
    if (isNotDefined(activeScene)) throw new Error('Engine: Cannot find an active scene');
    if (isNotDefined(text2dRenderer)) throw new Error('Engine: Cannot find an active text2d renderer');
    if (isNotDefined(text3dRenderer)) throw new Error('Engine: Cannot find an active text3d renderer');
    if (isNotDefined(renderer)) throw new Error('Engine: Cannot find an active renderer');

    Object.values(space.loops).forEach((loop: TLoop): void => queueMicrotask((): void => loop.start()));
  }

  function stop(): void {
    if (isNotDefined(space)) throw new Error('Engine is not started yet (space is not defined)');
    const { intersectionsWatcherService } = space.services;
    Object.values(space.loops).forEach((loop: TLoop): void => queueMicrotask((): void => loop.stop()));
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
