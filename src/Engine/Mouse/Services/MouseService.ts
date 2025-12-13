import type { Subscription } from 'rxjs';
import { filter, Subject } from 'rxjs';

import { WatcherTag } from '@/Engine/Abstract';
import type { TGlobalContainerDecorator } from '@/Engine/Global';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { MouseButtonValue, MouseEventType, MouseWheelValue } from '@/Engine/Mouse/Constants';
import { MouseClickWatcherFactory, MousePositionWatcherFactory } from '@/Engine/Mouse/Factories';
import type {
  TMouseClickWatcher,
  TMouseClickWatcherFactory,
  TMouseClickWatcherRegistry,
  TMousePositionWatcher,
  TMousePositionWatcherDependencies,
  TMousePositionWatcherFactory,
  TMousePositionWatcherRegistry,
  TMouseService,
  TMouseWatcherEvent
} from '@/Engine/Mouse/Models';
import { MouseClickWatcherRegistry, MousePositionWatcherRegistry } from '@/Engine/Mouse/Registries';

export function MouseService(container: TGlobalContainerDecorator, { loopService }: TMousePositionWatcherDependencies): TMouseService {
  const mouseClickWatcherFactory: TMouseClickWatcherFactory = MouseClickWatcherFactory();
  const mouseClickWatcherRegistry: TMouseClickWatcherRegistry = MouseClickWatcherRegistry();
  mouseClickWatcherFactory.entityCreated$.subscribe((watcher: TMouseClickWatcher) => mouseClickWatcherRegistry.add(watcher));
  const mouseClickWatcher: TMouseClickWatcher = mouseClickWatcherFactory.create({ container, tags: [WatcherTag.Initial, WatcherTag.Global] }).start();

  const mousePositionWatcherFactory: TMousePositionWatcherFactory = MousePositionWatcherFactory();
  const mousePositionWatcherRegistry: TMousePositionWatcherRegistry = MousePositionWatcherRegistry();

  mousePositionWatcherFactory.entityCreated$.subscribe((watcher: TMousePositionWatcher) => mousePositionWatcherRegistry.add(watcher));
  const mousePositionWatcher: TMousePositionWatcher = mousePositionWatcherFactory.create({ container, tags: [WatcherTag.Initial, WatcherTag.Global] }, { loopService }).start();

  const clickPress$: Subject<TMouseWatcherEvent> = new Subject<TMouseWatcherEvent>();
  const clickLeftPress$: Subject<TMouseWatcherEvent> = new Subject<TMouseWatcherEvent>();
  const clickRightPress$: Subject<TMouseWatcherEvent> = new Subject<TMouseWatcherEvent>();
  const clickMiddlePress$: Subject<TMouseWatcherEvent> = new Subject<TMouseWatcherEvent>();
  const clickBackPress$: Subject<TMouseWatcherEvent> = new Subject<TMouseWatcherEvent>();
  const clickForwardPress$: Subject<TMouseWatcherEvent> = new Subject<TMouseWatcherEvent>();
  const clickExtraPress$: Subject<TMouseWatcherEvent> = new Subject<TMouseWatcherEvent>();

  const clickRelease$: Subject<TMouseWatcherEvent> = new Subject<TMouseWatcherEvent>();
  const clickLeftRelease$: Subject<TMouseWatcherEvent> = new Subject<TMouseWatcherEvent>();
  const clickRightRelease$: Subject<TMouseWatcherEvent> = new Subject<TMouseWatcherEvent>();
  const clickMiddleRelease$: Subject<TMouseWatcherEvent> = new Subject<TMouseWatcherEvent>();
  const clickBackRelease$: Subject<TMouseWatcherEvent> = new Subject<TMouseWatcherEvent>();
  const clickForwardRelease$: Subject<TMouseWatcherEvent> = new Subject<TMouseWatcherEvent>();
  const clickExtraRelease$: Subject<TMouseWatcherEvent> = new Subject<TMouseWatcherEvent>();

  const isLeftPressed$: Subject<boolean> = new Subject<boolean>();
  const isRightPressed$: Subject<boolean> = new Subject<boolean>();
  const isMiddlePressed$: Subject<boolean> = new Subject<boolean>();
  const isBackPressed$: Subject<boolean> = new Subject<boolean>();
  const isForwardPressed$: Subject<boolean> = new Subject<boolean>();
  const isExtraPressed$: Subject<boolean> = new Subject<boolean>();

  const doubleClick$: Subject<TMouseWatcherEvent> = new Subject<TMouseWatcherEvent>();
  const doubleLeftClick$: Subject<TMouseWatcherEvent> = new Subject<TMouseWatcherEvent>();
  const doubleRightClick$: Subject<TMouseWatcherEvent> = new Subject<TMouseWatcherEvent>();

  const wheel$: Subject<TMouseWatcherEvent> = new Subject<TMouseWatcherEvent>();
  const wheelUp$: Subject<TMouseWatcherEvent> = new Subject<TMouseWatcherEvent>();
  const wheelDown$: Subject<TMouseWatcherEvent> = new Subject<TMouseWatcherEvent>();

  clickPress$.pipe(filter((event: TMouseWatcherEvent): boolean => event.value === MouseButtonValue.Left)).subscribe((event: TMouseWatcherEvent) => clickLeftPress$.next(event));
  clickPress$.pipe(filter((event: TMouseWatcherEvent): boolean => event.value === MouseButtonValue.Right)).subscribe((event: TMouseWatcherEvent) => clickRightPress$.next(event));
  clickPress$.pipe(filter((event: TMouseWatcherEvent): boolean => event.value === MouseButtonValue.Middle)).subscribe((event: TMouseWatcherEvent) => clickMiddlePress$.next(event));
  clickPress$.pipe(filter((event: TMouseWatcherEvent): boolean => event.value === MouseButtonValue.Back)).subscribe((event: TMouseWatcherEvent) => clickBackPress$.next(event));
  clickPress$.pipe(filter((event: TMouseWatcherEvent): boolean => event.value === MouseButtonValue.Forward)).subscribe((event: TMouseWatcherEvent) => clickForwardPress$.next(event));
  clickPress$.pipe(filter((event: TMouseWatcherEvent): boolean => event.value === MouseButtonValue.Extra)).subscribe((event: TMouseWatcherEvent) => clickExtraPress$.next(event));

  clickLeftPress$.subscribe((): void => isLeftPressed$.next(true));
  clickRightPress$.subscribe((): void => isRightPressed$.next(true));
  clickMiddlePress$.subscribe((): void => isMiddlePressed$.next(true));
  clickBackPress$.subscribe((): void => isBackPressed$.next(true));
  clickForwardPress$.subscribe((): void => isForwardPressed$.next(true));
  clickExtraPress$.subscribe((): void => isExtraPressed$.next(true));

  clickRelease$.pipe(filter((event: TMouseWatcherEvent): boolean => event.value === MouseButtonValue.Left)).subscribe((event: TMouseWatcherEvent) => clickLeftRelease$.next(event));
  clickRelease$.pipe(filter((event: TMouseWatcherEvent): boolean => event.value === MouseButtonValue.Right)).subscribe((event: TMouseWatcherEvent) => clickRightRelease$.next(event));
  clickRelease$.pipe(filter((event: TMouseWatcherEvent): boolean => event.value === MouseButtonValue.Middle)).subscribe((event: TMouseWatcherEvent) => clickMiddleRelease$.next(event));
  clickRelease$.pipe(filter((event: TMouseWatcherEvent): boolean => event.value === MouseButtonValue.Back)).subscribe((event: TMouseWatcherEvent) => clickBackRelease$.next(event));
  clickRelease$.pipe(filter((event: TMouseWatcherEvent): boolean => event.value === MouseButtonValue.Forward)).subscribe((event: TMouseWatcherEvent) => clickForwardRelease$.next(event));
  clickRelease$.pipe(filter((event: TMouseWatcherEvent): boolean => event.value === MouseButtonValue.Extra)).subscribe((event: TMouseWatcherEvent) => clickExtraRelease$.next(event));

  clickLeftRelease$.subscribe((): void => isLeftPressed$.next(false));
  clickRightRelease$.subscribe((): void => isRightPressed$.next(false));
  clickMiddleRelease$.subscribe((): void => isMiddlePressed$.next(false));
  clickBackRelease$.subscribe((): void => isBackPressed$.next(false));
  clickForwardRelease$.subscribe((): void => isForwardPressed$.next(false));
  clickExtraRelease$.subscribe((): void => isExtraPressed$.next(false));

  doubleClick$.pipe(filter((event: TMouseWatcherEvent): boolean => event.value === MouseButtonValue.Left)).subscribe((event: TMouseWatcherEvent) => doubleLeftClick$.next(event));
  doubleClick$.pipe(filter((event: TMouseWatcherEvent): boolean => event.value === MouseButtonValue.Right)).subscribe((event: TMouseWatcherEvent) => doubleRightClick$.next(event));

  wheel$.pipe(filter((event: TMouseWatcherEvent): boolean => event.value === MouseWheelValue.WheelUp)).subscribe((event: TMouseWatcherEvent) => wheelUp$.next(event));
  wheel$.pipe(filter((event: TMouseWatcherEvent): boolean => event.value === MouseWheelValue.WheelDown)).subscribe((event: TMouseWatcherEvent) => wheelDown$.next(event));

  mouseClickWatcher.value$.subscribe((event: TMouseWatcherEvent): void => {
    if (event.type === MouseEventType.MouseDown) clickPress$.next(event);
    if (event.type === MouseEventType.MouseUp) clickRelease$.next(event);
    if (event.type === MouseEventType.DoubleClick) doubleClick$.next(event);
    if (event.type === MouseEventType.Wheel) wheel$.next(event);
  });

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    clickPress$.complete();
    clickPress$.unsubscribe();
    clickLeftPress$.complete();
    clickLeftPress$.unsubscribe();
    clickRightPress$.complete();
    clickRightPress$.unsubscribe();
    clickMiddlePress$.complete();
    clickMiddlePress$.unsubscribe();
    clickBackPress$.complete();
    clickBackPress$.unsubscribe();
    clickForwardPress$.complete();
    clickForwardPress$.unsubscribe();
    clickExtraPress$.complete();
    clickExtraPress$.unsubscribe();

    clickRelease$.complete();
    clickRelease$.unsubscribe();
    clickLeftRelease$.complete();
    clickLeftRelease$.unsubscribe();
    clickRightRelease$.complete();
    clickRightRelease$.unsubscribe();
    clickMiddleRelease$.complete();
    clickMiddleRelease$.unsubscribe();
    clickBackRelease$.complete();
    clickBackRelease$.unsubscribe();
    clickForwardRelease$.complete();
    clickForwardRelease$.unsubscribe();
    clickExtraRelease$.complete();
    clickExtraRelease$.unsubscribe();

    isLeftPressed$.complete();
    isLeftPressed$.unsubscribe();
    isRightPressed$.complete();
    isRightPressed$.unsubscribe();
    isMiddlePressed$.complete();
    isMiddlePressed$.unsubscribe();
    isBackPressed$.complete();
    isBackPressed$.unsubscribe();
    isForwardPressed$.complete();
    isForwardPressed$.unsubscribe();
    isExtraPressed$.complete();
    isExtraPressed$.unsubscribe();

    doubleClick$.complete();
    doubleClick$.unsubscribe();
    doubleLeftClick$.complete();
    doubleLeftClick$.unsubscribe();
    doubleRightClick$.complete();
    doubleRightClick$.unsubscribe();

    wheel$.complete();
    wheel$.unsubscribe();
    wheelUp$.complete();
    wheelUp$.unsubscribe();
    wheelDown$.complete();
    wheelDown$.unsubscribe();
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
