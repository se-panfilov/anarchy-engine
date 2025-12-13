import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import { ambientContext } from '@/Engine/Context';
import type { TAppGlobalContainer, TContainerDecorator } from '@/Engine/Global';
import type { TDisposable } from '@/Engine/Mixins';
import type { TScreenService, TScreenSizeWatcherFactory, TScreenSizeWatcherRegistry } from '@/Engine/Screen/Models';
import { exitFullScreen, goFullScreen, isFullScreen } from '@/Engine/Screen/Utils';
import type { TSpaceCanvas } from '@/Engine/Space';
import { getCanvasContainer, isDefined } from '@/Engine/Utils';

import { ScreenSizeWatcherService } from './ScreenSizeWatcherService';

export function ScreenService(factory: TScreenSizeWatcherFactory, registry: TScreenSizeWatcherRegistry): TScreenService {
  const disposable: ReadonlyArray<TDisposable> = [registry, factory];
  const abstractService: TAbstractService = AbstractService(disposable);
  let canvas: TSpaceCanvas | undefined;

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    (abstractService as TScreenService).watchers?.destroy$.next();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    watchers: ScreenSizeWatcherService(factory, registry),
    setCanvas: (appCanvas: TSpaceCanvas): void => void (canvas = appCanvas),
    getCanvas: (): TSpaceCanvas | undefined => canvas,
    destroyCanvas: (): void => {
      (canvas as HTMLCanvasElement).remove();
      if (canvas?.parentNode) canvas.parentNode.removeChild(canvas);
      canvas = undefined;
    },
    goFullScreen: (): Promise<void> => goFullScreen(canvas),
    exitFullScreen: (): Promise<void> => exitFullScreen(ambientContext.globalContainer.getAppContainer()),
    toggleFullScreen: (): Promise<void> => {
      const container: TAppGlobalContainer = ambientContext.globalContainer.getAppContainer();
      return isFullScreen(container) ? exitFullScreen(container) : goFullScreen(canvas);
    },
    getContainer: (): TContainerDecorator | undefined => (isDefined(canvas) ? getCanvasContainer(canvas) : undefined),
    isFullScreen: (): boolean => isFullScreen(ambientContext.globalContainer.getAppContainer())
  });
}
