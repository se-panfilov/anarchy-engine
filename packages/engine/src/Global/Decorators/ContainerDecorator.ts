import type { TAppGlobalContainer, TContainerDecorator } from '@Engine/Global/Models';
import type { TDestroyable } from '@Engine/Mixins';
import { destroyableMixin } from '@Engine/Mixins';
import type { TSpaceCanvas } from '@Engine/Space';
import { exitFullScreen, getWindowFromDomElement, goFullScreen, isDefined, isFullScreen, isNotDefined, observeContainerRect } from '@Engine/Utils';
import { nanoid } from 'nanoid';
import type { Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, skip, Subject, switchMap } from 'rxjs';

export function ContainerDecorator(container: TAppGlobalContainer | HTMLElement): TContainerDecorator {
  const resize$: Subject<DOMRect> = new Subject<DOMRect>();
  const canvas$: BehaviorSubject<TSpaceCanvas | undefined> = new BehaviorSubject<TSpaceCanvas | undefined>(undefined);
  const fullScreen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  //If App launched in a div (not fullscreen), we need to get relative coords for mouse position, so we need this rect.
  const viewportRect$: BehaviorSubject<DOMRect> = new BehaviorSubject<DOMRect>(getViewportRect());

  function getAppContainer(): TAppGlobalContainer | never {
    const globalContainer: Readonly<Window> | null = getWindowFromDomElement(container);
    if (isNotDefined(globalContainer)) throw new Error(`Cannot find global ${container}`);
    return globalContainer;
  }

  const observeContainerRectSub: Subscription = observeContainerRect(container).subscribe((rect: DOMRect): void => resize$.next(rect));

  function getViewportRect(): DOMRect {
    return isDefined((container as HTMLElement).getBoundingClientRect)
      ? (container as HTMLElement).getBoundingClientRect()
      : ({
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerHeight,
          top: 0,
          left: 0,
          bottom: window.innerHeight,
          right: window.innerWidth
        } as DOMRect);
  }

  const screenSizeRectSub$: Subscription = resize$.subscribe((): void => viewportRect$.next(getViewportRect()));

  const fullScreenSub$: Subscription = fullScreen$
    .pipe(
      skip(1),
      distinctUntilChanged(),
      switchMap((isFullScreen: boolean): Promise<void> => (isFullScreen ? goFullScreen(canvas$.value) : exitFullScreen(getAppContainer())))
    )
    .subscribe({
      error: (err: any): never => {
        throw new Error('Container: Failed to toggle fullscreen', err);
      }
    });

  const destroyable: TDestroyable = destroyableMixin();

  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    //Pay attention: We don't remove the DOM element here

    destroySub$.unsubscribe();
    screenSizeRectSub$.unsubscribe();
    observeContainerRectSub.unsubscribe();
    fullScreenSub$.unsubscribe();

    resize$.complete();
    canvas$.complete();
    fullScreen$.complete();
    viewportRect$.complete();
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
      canvas$,
      getElement: (): TAppGlobalContainer | HTMLElement => container,
      resize$: resize$.asObservable(),
      viewportRect$,
      fullScreen$,
      isFullScreen: (): boolean => isFullScreen(getAppContainer())
    },
    destroyable
  );
}
