import type { TAppCanvas } from '@/Engine/App';
import { ambientContext } from '@/Engine/Context';
import type { IAppGlobalContainer } from '@/Engine/Global';
import type { IScreenService } from '@/Engine/Services/ScreenService/Models';
import { isNotDefined } from '@/Engine/Utils';

export function ScreenService(): IScreenService {
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

export function isFullScreen(container: IAppGlobalContainer | undefined): boolean {
  if (isNotDefined(container)) throw new Error('Container (window?) is not defined');
  if (isNotDefined(container.document)) throw new Error('Container (document?) is not defined');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return Boolean(container.document.fullscreenElement || (container.document as any).webkitFullscreenElement);
}

export function goFullScreen(canvas: TAppCanvas | undefined): Promise<void> | never {
  if (isNotDefined(canvas)) throw new Error('Canvas is not defined');
  if (canvas.requestFullscreen) return canvas.requestFullscreen();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call
  if ((canvas as any).webkitRequestFullscreen) return (canvas as any).webkitRequestFullscreen();

  throw new Error('Fullscreen is not supported');
}

export function exitFullScreen(container: IAppGlobalContainer | undefined): Promise<void> | never {
  if (isNotDefined(container)) throw new Error('Container (window?) is not defined');
  if (isNotDefined(container.document)) throw new Error('Container (document?) is not defined');
  return container.document.exitFullscreen();
}

export const screenService: IScreenService = ScreenService();
