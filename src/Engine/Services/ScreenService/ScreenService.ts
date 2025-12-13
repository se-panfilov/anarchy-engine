import type { TAppCanvas } from '@/Engine/App';
import { ambientContext } from '@/Engine/Context';
import type { TAppGlobalContainer } from '@/Engine/Global';
import type { TScreenService } from '@/Engine/Services/ScreenService/Models';
import { isNotDefined } from '@/Engine/Utils';

export function ScreenService(): TScreenService {
  let canvas: TAppCanvas | undefined;

  return {
    setCanvas: (appCanvas: TAppCanvas): void => void (canvas = appCanvas),
    getCanvas: (): TAppCanvas | undefined => canvas,
    goFullScreen: (): Promise<void> => goFullScreen(canvas),
    exitFullScreen: (): Promise<void> => exitFullScreen(ambientContext.container.getAppContainer()),
    toggleFullScreen: (): Promise<void> => {
      const container = ambientContext.container.getAppContainer();
      return isFullScreen(container) ? exitFullScreen(container) : goFullScreen(canvas);
    },
    isFullScreen: (): boolean => isFullScreen(ambientContext.container.getAppContainer())
  };
}

export function isFullScreen(container: TAppGlobalContainer | undefined): boolean {
  if (isNotDefined(container)) throw new Error('Container (window?) is not defined');
  if (isNotDefined(container.document)) throw new Error('Container (document?) is not defined');

  return Boolean(container.document.fullscreenElement || (container.document as any).webkitFullscreenElement);
}

export function goFullScreen(canvas: TAppCanvas | undefined): Promise<void> | never {
  if (isNotDefined(canvas)) throw new Error('Canvas is not defined');
  if (canvas.requestFullscreen) return canvas.requestFullscreen();
  if ((canvas as any).webkitRequestFullscreen) return (canvas as any).webkitRequestFullscreen();

  throw new Error('Fullscreen is not supported');
}

export function exitFullScreen(container: TAppGlobalContainer | undefined): Promise<void> | never {
  if (isNotDefined(container)) throw new Error('Container (window?) is not defined');
  if (isNotDefined(container.document)) throw new Error('Container (document?) is not defined');
  return container.document.exitFullscreen();
}

export const screenService: TScreenService = ScreenService();
