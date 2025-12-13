import type { TEngine } from '@/Engine/Engine/Models';
import type { TIntersectionsWatcher } from '@/Engine/Intersections';
import type { TKeyboardService } from '@/Engine/Keyboard';
import { KeyboardService } from '@/Engine/Keyboard';
import type { TLoop } from '@/Engine/Loop';
import type { TSpace } from '@/Engine/Space';
import { isNotDefined } from '@/Engine/Utils';

export function Engine(space: TSpace): TEngine {
  const keyboardService: TKeyboardService = KeyboardService(space.loops.keyboardLoop);

  function start(): void {
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
