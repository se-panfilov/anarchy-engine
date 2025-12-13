import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import { ambientContext } from '@/Engine/Context';
import type { TAppGlobalContainer } from '@/Engine/Global';
import type { TScreenService, TScreenSizeWatcherFactory, TScreenSizeWatcherRegistry } from '@/Engine/Screen/Models';
import { exitFullScreen, goFullScreen, isFullScreen } from '@/Engine/Screen/Utils';
import type { TSpaceCanvas } from '@/Engine/Space';

import { ScreenSizeWatcherService } from './ScreenSizeWatcherService';

export function ScreenService(factory: TScreenSizeWatcherFactory, registry: TScreenSizeWatcherRegistry): TScreenService {
  const abstractService: TAbstractService = AbstractService();
  let canvas: TSpaceCanvas | undefined;

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
    exitFullScreen: (): Promise<void> => exitFullScreen(ambientContext.container.getAppContainer()),
    toggleFullScreen: (): Promise<void> => {
      const container: TAppGlobalContainer = ambientContext.container.getAppContainer();
      return isFullScreen(container) ? exitFullScreen(container) : goFullScreen(canvas);
    },
    isFullScreen: (): boolean => isFullScreen(ambientContext.container.getAppContainer())
  });
}
