import { ambientContext } from '@Anarchy/Engine/Context';
import type { TAppGlobalContainer, TContainerDecorator } from '@Anarchy/Engine/Global';
import { ContainerDecorator } from '@Anarchy/Engine/Global/Decorators';
import { isDefined, isNotDefined } from '@Anarchy/Shared/Utils';
import type { Subscriber } from 'rxjs';
import { distinctUntilChanged, fromEvent, map, merge, Observable, startWith } from 'rxjs';

export function findDomElement(canvasSelector: string): HTMLElement | null {
  const appContainer: TAppGlobalContainer = ambientContext.globalContainer.getAppContainer();
  return appContainer.document.querySelector(canvasSelector);
}

export function createDomElement(tagName: string, parent?: HTMLElement | undefined, classes?: ReadonlyArray<string>, id?: string, style?: string): HTMLElement {
  const appContainer: TAppGlobalContainer = ambientContext.globalContainer.getAppContainer();
  const element: HTMLElement = appContainer.document.createElement(tagName);

  if (isDefined(id)) element.setAttribute('id', id);
  if (isDefined(classes)) element.setAttribute('class', classes.join(' '));
  if (isDefined(style)) element.setAttribute('style', style);

  (parent ?? appContainer.document.body).appendChild(element);

  return element;
}

export function isCanvasElement(element: HTMLElement | unknown): element is HTMLCanvasElement {
  return element instanceof HTMLCanvasElement;
}

export function getOrCreateCanvasFromSelector(fullSelector: string): HTMLCanvasElement {
  const trimmed: string = fullSelector.trim();
  if (!trimmed) throw new Error('Canvas selector must not be empty');

  const parts: Array<string> = trimmed.split(/\s+/);
  // eslint-disable-next-line functional/immutable-data
  const canvasSelector: string | undefined = parts.pop();
  if (isNotDefined(canvasSelector)) throw new Error('Canvas selector must be defined');
  const parentSelector: string = parts.join(' ');

  const parent: HTMLElement = parentSelector ? (document.querySelector(parentSelector) as HTMLElement) : document.body;
  if (isNotDefined(parent)) throw new Error(`Parent element not found for selector: "${parentSelector}"`);

  let canvas: HTMLCanvasElement | null = parent.querySelector(canvasSelector) as HTMLCanvasElement | null;
  if (isDefined(canvas)) return canvas;

  const id: string = getIdFromSelector(canvasSelector);
  const classes: ReadonlyArray<string> = [];
  canvas = createDomElement('canvas', undefined, classes, id) as HTMLCanvasElement;
  parent.appendChild(canvas);

  return canvas;
}

function getIdFromSelector(selector: string): string {
  const id: string | undefined = selector.match(/#([a-zA-Z0-9\-_]+)/)?.[1];
  if (isNotDefined(id)) throw new Error(`Canvas selector must contain id: "${selector}"`);
  return id;
}

export function getWindowFromDomElement(element: HTMLElement | Window): TAppGlobalContainer | null {
  //SSR
  if (typeof window === 'undefined') return null;
  if (element === window) return window;
  return (element as Element).ownerDocument.defaultView;
}

export function getCanvasContainer(canvas: HTMLCanvasElement): TContainerDecorator | never {
  const parent: HTMLElement | null = canvas.parentElement;
  if (isNotDefined(parent)) throw new Error(`Can't find canvas' parent element`);
  return ContainerDecorator(parent);
}

export function isAppGlobalContainer(container: TAppGlobalContainer | TContainerDecorator | HTMLElement): container is TAppGlobalContainer {
  return isDefined((container as TAppGlobalContainer).document);
}

function getRect(container: HTMLElement | TAppGlobalContainer): DOMRect {
  if (isAppGlobalContainer(container)) {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    } as DOMRect;
  } else {
    return container.getBoundingClientRect();
  }
}

export function observeContainerRect(container: HTMLElement | TAppGlobalContainer): Observable<DOMRect> {
  const resizeObserver$ = new Observable<DOMRect>((observer: Subscriber<DOMRect>) => {
    if (isAppGlobalContainer(container)) return undefined;

    const resizeObserver = new ResizeObserver((): void => observer.next(getRect(container)));
    resizeObserver.observe(container as HTMLElement);

    return (): void => resizeObserver.disconnect();
  });

  const generalEvents$: Observable<DOMRect> = merge(
    fromEvent(window, 'resize'),
    fromEvent(window, 'scroll', { passive: true }),
    fromEvent(document, 'fullscreenchange'),
    fromEvent(window, 'orientationchange'),
    fromEvent(document, 'visibilitychange')
  ).pipe(map((): DOMRect => getRect(container)));

  return merge(generalEvents$, resizeObserver$).pipe(
    startWith(getRect(container)),
    distinctUntilChanged((a: DOMRect, b: DOMRect): boolean => a.top === b.top && a.left === b.left && a.width === b.width && a.height === b.height)
  );
}

export function observeResize(
  container: TAppGlobalContainer | HTMLElement,
  callback: (list: ReadonlyArray<ResizeObserverEntry> | Event) => void
): Readonly<{
  stop: () => void;
}> {
  if (isAppGlobalContainer(container)) {
    window.addEventListener('resize', callback);
    return {
      stop: (): void => window.removeEventListener('resize', callback)
    };
  }

  const resizeObserver = new ResizeObserver(callback);
  resizeObserver.observe(container);

  return {
    stop: (): void => {
      resizeObserver.unobserve(container);
      resizeObserver.disconnect();
    }
  };
}

export function injectStyle(css: string, id: string): void {
  if (document.getElementById(id)) return;

  const tag: HTMLStyleElement = document.createElement('style');
  // eslint-disable-next-line functional/immutable-data
  tag.id = id;
  // eslint-disable-next-line functional/immutable-data
  tag.textContent = css;
  const appContainer: TAppGlobalContainer = ambientContext.globalContainer.getAppContainer();
  appContainer.document.head.appendChild(tag);
}
