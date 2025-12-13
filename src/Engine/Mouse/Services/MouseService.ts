import { filter, Subject } from 'rxjs';

import { WatcherTag } from '@/Engine/Abstract';
import { ambientContext } from '@/Engine/Context';
import type { TGlobalContainerDecorator } from '@/Engine/Global';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { MouseButtonValue, MouseEventType, MouseWheelValue } from '@/Engine/Mouse/Constants';
import { MouseClickWatcherFactory, MousePositionWatcherFactory } from '@/Engine/Mouse/Factories';
import type {
  IMouseClickWatcher,
  IMouseClickWatcherFactory,
  IMouseClickWatcherRegistry,
  IMousePositionWatcher,
  IMousePositionWatcherFactory,
  IMousePositionWatcherRegistry,
  IMouseService,
  IMouseWatcherEvent
} from '@/Engine/Mouse/Models';
import { MouseClickWatcherRegistry, MousePositionWatcherRegistry } from '@/Engine/Mouse/Registries';

export function MouseService(container: TGlobalContainerDecorator): IMouseService {
  const mouseClickWatcherFactory: IMouseClickWatcherFactory = MouseClickWatcherFactory();
  const mouseClickWatcherRegistry: IMouseClickWatcherRegistry = MouseClickWatcherRegistry();
  mouseClickWatcherFactory.entityCreated$.subscribe((watcher: IMouseClickWatcher) => mouseClickWatcherRegistry.add(watcher));
  const mouseClickWatcher: IMouseClickWatcher = mouseClickWatcherFactory.create({ container, tags: [WatcherTag.Initial, WatcherTag.Global] }).start();

  const mousePositionWatcherFactory: IMousePositionWatcherFactory = MousePositionWatcherFactory();
  const mousePositionWatcherRegistry: IMousePositionWatcherRegistry = MousePositionWatcherRegistry();

  mousePositionWatcherFactory.entityCreated$.subscribe((watcher: IMousePositionWatcher) => mousePositionWatcherRegistry.add(watcher));
  const mousePositionWatcher: IMousePositionWatcher = mousePositionWatcherFactory.create({ container, tags: [WatcherTag.Initial, WatcherTag.Global] }).start();

  const clickPress$: Subject<IMouseWatcherEvent> = new Subject<IMouseWatcherEvent>();
  const clickLeftPress$: Subject<IMouseWatcherEvent> = new Subject<IMouseWatcherEvent>();
  const clickRightPress$: Subject<IMouseWatcherEvent> = new Subject<IMouseWatcherEvent>();
  const clickMiddlePress$: Subject<IMouseWatcherEvent> = new Subject<IMouseWatcherEvent>();
  const clickBackPress$: Subject<IMouseWatcherEvent> = new Subject<IMouseWatcherEvent>();
  const clickForwardPress$: Subject<IMouseWatcherEvent> = new Subject<IMouseWatcherEvent>();
  const clickExtraPress$: Subject<IMouseWatcherEvent> = new Subject<IMouseWatcherEvent>();

  const clickRelease$: Subject<IMouseWatcherEvent> = new Subject<IMouseWatcherEvent>();
  const clickLeftRelease$: Subject<IMouseWatcherEvent> = new Subject<IMouseWatcherEvent>();
  const clickRightRelease$: Subject<IMouseWatcherEvent> = new Subject<IMouseWatcherEvent>();
  const clickMiddleRelease$: Subject<IMouseWatcherEvent> = new Subject<IMouseWatcherEvent>();
  const clickBackRelease$: Subject<IMouseWatcherEvent> = new Subject<IMouseWatcherEvent>();
  const clickForwardRelease$: Subject<IMouseWatcherEvent> = new Subject<IMouseWatcherEvent>();
  const clickExtraRelease$: Subject<IMouseWatcherEvent> = new Subject<IMouseWatcherEvent>();

  const isLeftPressed$: Subject<boolean> = new Subject<boolean>();
  const isRightPressed$: Subject<boolean> = new Subject<boolean>();
  const isMiddlePressed$: Subject<boolean> = new Subject<boolean>();
  const isBackPressed$: Subject<boolean> = new Subject<boolean>();
  const isForwardPressed$: Subject<boolean> = new Subject<boolean>();
  const isExtraPressed$: Subject<boolean> = new Subject<boolean>();

  const doubleClick$: Subject<IMouseWatcherEvent> = new Subject<IMouseWatcherEvent>();
  const doubleLeftClick$: Subject<IMouseWatcherEvent> = new Subject<IMouseWatcherEvent>();
  const doubleRightClick$: Subject<IMouseWatcherEvent> = new Subject<IMouseWatcherEvent>();

  const wheel$: Subject<IMouseWatcherEvent> = new Subject<IMouseWatcherEvent>();
  const wheelUp$: Subject<IMouseWatcherEvent> = new Subject<IMouseWatcherEvent>();
  const wheelDown$: Subject<IMouseWatcherEvent> = new Subject<IMouseWatcherEvent>();

  clickPress$.pipe(filter((event: IMouseWatcherEvent): boolean => event.value === MouseButtonValue.Left)).subscribe((event: IMouseWatcherEvent) => clickLeftPress$.next(event));
  clickPress$.pipe(filter((event: IMouseWatcherEvent): boolean => event.value === MouseButtonValue.Right)).subscribe((event: IMouseWatcherEvent) => clickRightPress$.next(event));
  clickPress$.pipe(filter((event: IMouseWatcherEvent): boolean => event.value === MouseButtonValue.Middle)).subscribe((event: IMouseWatcherEvent) => clickMiddlePress$.next(event));
  clickPress$.pipe(filter((event: IMouseWatcherEvent): boolean => event.value === MouseButtonValue.Back)).subscribe((event: IMouseWatcherEvent) => clickBackPress$.next(event));
  clickPress$.pipe(filter((event: IMouseWatcherEvent): boolean => event.value === MouseButtonValue.Forward)).subscribe((event: IMouseWatcherEvent) => clickForwardPress$.next(event));
  clickPress$.pipe(filter((event: IMouseWatcherEvent): boolean => event.value === MouseButtonValue.Extra)).subscribe((event: IMouseWatcherEvent) => clickExtraPress$.next(event));

  clickLeftPress$.subscribe((): void => isLeftPressed$.next(true));
  clickRightPress$.subscribe((): void => isRightPressed$.next(true));
  clickMiddlePress$.subscribe((): void => isMiddlePressed$.next(true));
  clickBackPress$.subscribe((): void => isBackPressed$.next(true));
  clickForwardPress$.subscribe((): void => isForwardPressed$.next(true));
  clickExtraPress$.subscribe((): void => isExtraPressed$.next(true));

  clickRelease$.pipe(filter((event: IMouseWatcherEvent): boolean => event.value === MouseButtonValue.Left)).subscribe((event: IMouseWatcherEvent) => clickLeftRelease$.next(event));
  clickRelease$.pipe(filter((event: IMouseWatcherEvent): boolean => event.value === MouseButtonValue.Right)).subscribe((event: IMouseWatcherEvent) => clickRightRelease$.next(event));
  clickRelease$.pipe(filter((event: IMouseWatcherEvent): boolean => event.value === MouseButtonValue.Middle)).subscribe((event: IMouseWatcherEvent) => clickMiddleRelease$.next(event));
  clickRelease$.pipe(filter((event: IMouseWatcherEvent): boolean => event.value === MouseButtonValue.Back)).subscribe((event: IMouseWatcherEvent) => clickBackRelease$.next(event));
  clickRelease$.pipe(filter((event: IMouseWatcherEvent): boolean => event.value === MouseButtonValue.Forward)).subscribe((event: IMouseWatcherEvent) => clickForwardRelease$.next(event));
  clickRelease$.pipe(filter((event: IMouseWatcherEvent): boolean => event.value === MouseButtonValue.Extra)).subscribe((event: IMouseWatcherEvent) => clickExtraRelease$.next(event));

  clickLeftRelease$.subscribe((): void => isLeftPressed$.next(false));
  clickRightRelease$.subscribe((): void => isRightPressed$.next(false));
  clickMiddleRelease$.subscribe((): void => isMiddlePressed$.next(false));
  clickBackRelease$.subscribe((): void => isBackPressed$.next(false));
  clickForwardRelease$.subscribe((): void => isForwardPressed$.next(false));
  clickExtraRelease$.subscribe((): void => isExtraPressed$.next(false));

  doubleClick$.pipe(filter((event: IMouseWatcherEvent): boolean => event.value === MouseButtonValue.Left)).subscribe((event: IMouseWatcherEvent) => doubleLeftClick$.next(event));
  doubleClick$.pipe(filter((event: IMouseWatcherEvent): boolean => event.value === MouseButtonValue.Right)).subscribe((event: IMouseWatcherEvent) => doubleRightClick$.next(event));

  wheel$.pipe(filter((event: IMouseWatcherEvent): boolean => event.value === MouseWheelValue.WheelUp)).subscribe((event: IMouseWatcherEvent) => wheelUp$.next(event));
  wheel$.pipe(filter((event: IMouseWatcherEvent): boolean => event.value === MouseWheelValue.WheelDown)).subscribe((event: IMouseWatcherEvent) => wheelDown$.next(event));

  mouseClickWatcher.value$.subscribe((event: IMouseWatcherEvent): void => {
    if (event.type === MouseEventType.MouseDown) clickPress$.next(event);
    if (event.type === MouseEventType.MouseUp) clickRelease$.next(event);
    if (event.type === MouseEventType.DoubleClick) doubleClick$.next(event);
    if (event.type === MouseEventType.Wheel) wheel$.next(event);
  });

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    clickPress$.complete();
    clickLeftPress$.complete();
    clickRightPress$.complete();
    clickMiddlePress$.complete();
    clickBackPress$.complete();
    clickForwardPress$.complete();
    clickExtraPress$.complete();

    clickRelease$.complete();
    clickLeftRelease$.complete();
    clickRightRelease$.complete();
    clickMiddleRelease$.complete();
    clickBackRelease$.complete();
    clickForwardRelease$.complete();
    clickExtraRelease$.complete();

    isLeftPressed$.complete();
    isRightPressed$.complete();
    isMiddlePressed$.complete();
    isBackPressed$.complete();
    isForwardPressed$.complete();
    isExtraPressed$.complete();

    doubleClick$.complete();
    doubleLeftClick$.complete();
    doubleRightClick$.complete();

    wheel$.complete();
    wheelUp$.complete();
    wheelDown$.complete();
  });

  return {
    clickPress$: clickPress$.asObservable(),
    clickLeftPress$: clickLeftPress$.asObservable(),
    clickRightPress$: clickRightPress$.asObservable(),
    clickMiddlePress$: clickMiddlePress$.asObservable(),
    clickBackPress$: clickBackPress$.asObservable(),
    clickForwardPress$: clickForwardPress$.asObservable(),
    clickExtraPress$: clickExtraPress$.asObservable(),

    clickRelease$: clickRelease$.asObservable(),
    clickLeftRelease$: clickLeftRelease$.asObservable(),
    clickRightRelease$: clickRightRelease$.asObservable(),
    clickMiddleRelease$: clickMiddleRelease$.asObservable(),
    clickBackRelease$: clickBackRelease$.asObservable(),
    clickForwardRelease$: clickForwardRelease$.asObservable(),
    clickExtraRelease$: clickExtraRelease$.asObservable(),

    isLeftPressed$: isLeftPressed$.asObservable(),
    isRightPressed$: isRightPressed$.asObservable(),
    isMiddlePressed$: isMiddlePressed$.asObservable(),
    isBackPressed$: isBackPressed$.asObservable(),
    isForwardPressed$: isForwardPressed$.asObservable(),
    isExtraPressed$: isExtraPressed$.asObservable(),

    doubleClick$: doubleClick$.asObservable(),
    doubleLeftClick$: doubleLeftClick$.asObservable(),
    doubleRightClick$: doubleRightClick$.asObservable(),

    wheel$: wheel$.asObservable(),
    wheelUp$: wheelUp$.asObservable(),
    wheelDown$: wheelDown$.asObservable(),

    position$: mousePositionWatcher.value$,
    ...destroyable
  };
}

export const mouseService: IMouseService = MouseService(ambientContext.container);
