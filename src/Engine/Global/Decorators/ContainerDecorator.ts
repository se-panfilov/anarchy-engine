import { nanoid } from 'nanoid';
import type { Subscription } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';

import type { TAppGlobalContainer, TContainerDecorator } from '@/Engine/Global/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { getWindowFromDomElement, isDefined, isNotDefined, observeResize, onFullScreenChange, trackScroll } from '@/Engine/Utils';

// TODO 14-0-0: ContainerDecorator could fully replace ScreenSizeWatcher
export function ContainerDecorator(container: TAppGlobalContainer | HTMLElement): TContainerDecorator {
  const resize$: Subject<ReadonlyArray<ResizeObserverEntry> | Event> = new Subject<ReadonlyArray<ResizeObserverEntry> | Event>();

  //If App launched in a div (not fullscreen), we need to get relative coords for mouse position, so we need this rect.
  const viewportRect$: BehaviorSubject<DOMRect | undefined> = new BehaviorSubject<DOMRect | undefined>(getViewportRect());

  function getAppContainer(): TAppGlobalContainer | never {
    const globalContainer: Readonly<Window> | null = getWindowFromDomElement(container);
    if (isNotDefined(globalContainer)) throw new Error(`Cannot find global ${container}`);
    return globalContainer;
  }

  const { stop: stopObserveResize } = observeResize(container, (v: ReadonlyArray<ResizeObserverEntry> | Event): void => resize$.next(v));

  // TODO 14-0-0: check if scroll works and necessary
  const trackScrollSub$: Subscription = trackScroll(container).subscribe((a: number, b: number): void => {
    console.log('XXX scroll', a, b);
  });

  // TODO 14-0-0: check if scroll works and necessary
  const fullScreenChangeSub$: Subscription = onFullScreenChange(container).subscribe((rect: DOMRect): void => {
    console.log('XXX fullscreen', rect);
  });

  function getViewportRect(): DOMRect | undefined {
    return isDefined((container as HTMLElement).getBoundingClientRect) ? (container as HTMLElement).getBoundingClientRect() : undefined;
  }

  const screenSizeRectSub$: Subscription = resize$.subscribe((): void => viewportRect$.next(getViewportRect()));

  const destroyable: TDestroyable = destroyableMixin();

  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    //Pay attention: We don't remove the DOM element here

    destroySub$.unsubscribe();
    screenSizeRectSub$.unsubscribe();
    trackScrollSub$.unsubscribe();
    fullScreenChangeSub$.unsubscribe();

    resize$.complete();
    viewportRect$.complete();

    stopObserveResize();
  });

  return Object.assign(
    {
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
    },
    destroyable
  );
}
