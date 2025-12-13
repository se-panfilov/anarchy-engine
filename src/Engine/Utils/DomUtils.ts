import { ambientContext } from '@/Engine/Context';
import type { TAppGlobalContainer } from '@/Engine/Global';
import type { TSpaceCanvas } from '@/Engine/Space';

export function findDomElement(canvasId: string): HTMLElement | null {
  const appContainer: TAppGlobalContainer = ambientContext.container.getAppContainer();
  return appContainer.document.querySelector(canvasId);
}

export function findOrCreateCanvas(canvasId: string): TSpaceCanvas | never {
  const result: TSpaceCanvas | HTMLElement = findDomElement(canvasId) ?? createDomElement(canvasId, 'canvas');
  if (!isCanvasElement(result)) throw new Error(`DomUtils: Canvas ("${canvasId}") found, but it isn't an instance of HTMLCanvasElement`);
  return result;
}

export function createDomElement(selector: string, tagName: string): HTMLElement {
  const appContainer: TAppGlobalContainer = ambientContext.container.getAppContainer();
  const element: HTMLElement = appContainer.document.createElement(tagName);
  element.setAttribute('id', selector.replace('#', ''));
  appContainer.document.appendChild(element);

  return element;
}

export function isCanvasElement(element: HTMLElement | unknown): element is HTMLCanvasElement {
  return element instanceof HTMLCanvasElement;
}
