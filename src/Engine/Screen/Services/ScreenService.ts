import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TAppCanvas } from '@/Engine/App';
import { ambientContext } from '@/Engine/Context';
import type { TAppGlobalContainer } from '@/Engine/Global';
import type { TScreenService, TScreenSizeWatcherFactory, TScreenSizeWatcherRegistry } from '@/Engine/Screen/Models';
import { exitFullScreen, goFullScreen, isFullScreen } from '@/Engine/Screen/Utils';

import { ScreenSizeWatcherService } from './ScreenSizeWatcherService';

export function ScreenService(factory: TScreenSizeWatcherFactory, registry: TScreenSizeWatcherRegistry): TScreenService {
  const abstractService: TAbstractService = AbstractService();
  let canvas: TAppCanvas | undefined;

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, ScreenSizeWatcherService(factory, registry), {
    setCanvas: (appCanvas: TAppCanvas): void => void (canvas = appCanvas),
    getCanvas: (): TAppCanvas | undefined => canvas,
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
