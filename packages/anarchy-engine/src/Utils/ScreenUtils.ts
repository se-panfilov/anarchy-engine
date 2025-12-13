import type { TAppGlobalContainer } from '@Anarchy/Engine/Global';
import type { TSpaceCanvas } from '@Anarchy/Engine/Space';
import { isNotDefined } from '@Anarchy/Shared/Utils';

export function isFullScreen(container: TAppGlobalContainer | undefined): boolean {
  if (isNotDefined(container)) throw new Error('Container (window?) is not defined');
  if (isNotDefined(container.document)) throw new Error('Container (document?) is not defined');

  return Boolean(container.document.fullscreenElement || (container.document as any).webkitFullscreenElement);
}

export function goFullScreen(canvas: TSpaceCanvas | undefined): Promise<void | never> {
  if (isNotDefined(canvas)) throw new Error('Canvas is not defined');
  if (canvas.requestFullscreen) return canvas.requestFullscreen();
  if ((canvas as any).webkitRequestFullscreen) return (canvas as any).webkitRequestFullscreen();

  throw new Error('Fullscreen is not supported');
}

export function exitFullScreen(container: TAppGlobalContainer | undefined): Promise<void | never> {
  if (isNotDefined(container)) throw new Error('Container (window?) is not defined');
  if (isNotDefined(container.document)) throw new Error('Container (document?) is not defined');
  return container.document.exitFullscreen();
}
