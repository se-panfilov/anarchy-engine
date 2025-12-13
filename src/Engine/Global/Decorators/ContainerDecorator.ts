import { nanoid } from 'nanoid';
import type { Subscription } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';

import type { TAppGlobalContainer, TContainerDecorator } from '@/Engine/Global/Models';
import { getWindowFromDomElement, isDefined, isNotDefined, observeResize, trackScroll } from '@/Engine/Utils';

// TODO 14-0-0: ContainerDecorator could fully replace ScreenSizeWatcher
export function ContainerDecorator(container: TAppGlobalContainer | HTMLElement): TContainerDecorator {
  // TODO 14-0-0: destroy resize$
  const resize$: Subject<ReadonlyArray<ResizeObserverEntry> | Event> = new Subject<ReadonlyArray<ResizeObserverEntry> | Event>();

  // TODO 14-0-0: destroy viewportRect$
  //If App launched in a div (not fullscreen), we need to get relative coords for mouse position, so we need this rect.
  const viewportRect$: BehaviorSubject<DOMRect | undefined> = new BehaviorSubject<DOMRect | undefined>(getViewportRect());

  function getAppContainer(): TAppGlobalContainer | never {
    const globalContainer: Readonly<Window> | null = getWindowFromDomElement(container);
    if (isNotDefined(globalContainer)) throw new Error(`Cannot find global ${container}`);
    return globalContainer;
  }

  // TODO 14-0-0: destroy observeResize
  observeResize(container, (v: ReadonlyArray<ResizeObserverEntry> | Event): void => resize$.next(v));

  // TODO 14-0-0: check if scroll works and necessary
  // TODO 14-0-0: destroy trackScroll
  trackScroll(container).subscribe((a: number, b: number): void => {
    console.log('XXX scroll', a, b);
  });

  function getViewportRect(): DOMRect | undefined {
    return isDefined((container as HTMLElement).getBoundingClientRect) ? (container as HTMLElement).getBoundingClientRect() : undefined;
  }

  // TODO 14-0-0: destroy screenSizeRectSub$
  const screenSizeRectSub$: Subscription = resize$.subscribe((): void => viewportRect$.next(getViewportRect()));

  return {
    id: nanoid(),
    getWidth: (): number => ((container as TAppGlobalContainer).innerWidth ? (container as TAppGlobalContainer).innerWidth : (container as HTMLElement).clientWidth),
    getHeight: (): number => ((container as TAppGlobalContainer).innerHeight ? (container as TAppGlobalContainer).innerHeight : (container as HTMLElement).clientHeight),
    getRatio: (): number => getAppContainer().devicePixelRatio || 1,
    startWatch: (type: string, cb: () => void): void => container.addEventListener(type, cb),
    stopWatch: (type: string, cb: () => void): void => container.removeEventListener(type, cb),
    getAppContainer,
    getElement: (): TAppGlobalContainer | HTMLElement => container,
    resize$: resize$.asObservable(),
    viewportRect$
  };
}
