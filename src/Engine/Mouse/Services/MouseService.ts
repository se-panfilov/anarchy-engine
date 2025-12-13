import type { Observable, Subscription } from 'rxjs';
import { EMPTY, filter, map, merge, mergeMap, Subject } from 'rxjs';

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
  TMousePositionWatcherFactory,
  TMousePositionWatcherRegistry,
  TMouseService,
  TMouseStateUpdate,
  TMouseWatcherEvent
} from '@/Engine/Mouse/Models';
import { MouseClickWatcherRegistry, MousePositionWatcherRegistry } from '@/Engine/Mouse/Registries';
import type { TSpaceLoops } from '@/Engine/Space';

export function MouseService(container: TGlobalContainerDecorator, { mouseLoop }: TSpaceLoops): TMouseService {
  const mouseClickWatcherFactory: TMouseClickWatcherFactory = MouseClickWatcherFactory();
  const mouseClickWatcherRegistry: TMouseClickWatcherRegistry = MouseClickWatcherRegistry();
  mouseClickWatcherFactory.entityCreated$.subscribe((watcher: TMouseClickWatcher) => mouseClickWatcherRegistry.add(watcher));
  const mouseClickWatcher: TMouseClickWatcher = mouseClickWatcherFactory.create({ container, tags: [WatcherTag.Initial, WatcherTag.Global] });
  mouseClickWatcher.start$.next();

  const mousePositionWatcherFactory: TMousePositionWatcherFactory = MousePositionWatcherFactory();
  const mousePositionWatcherRegistry: TMousePositionWatcherRegistry = MousePositionWatcherRegistry();

  mousePositionWatcherFactory.entityCreated$.subscribe((watcher: TMousePositionWatcher): void => mousePositionWatcherRegistry.add(watcher));
  const mousePositionWatcher: TMousePositionWatcher = mousePositionWatcherFactory.create({ container, tags: [WatcherTag.Initial, WatcherTag.Global] }, { mouseLoop });
  mousePositionWatcher.start$.next();

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

  const buttonPressMap = new Map<MouseButtonValue | MouseWheelValue, Subject<TMouseWatcherEvent>>([
    [MouseButtonValue.Left, clickLeftPress$],
    [MouseButtonValue.Right, clickRightPress$],
    [MouseButtonValue.Middle, clickMiddlePress$],
    [MouseButtonValue.Back, clickBackPress$],
    [MouseButtonValue.Forward, clickForwardPress$],
    [MouseButtonValue.Extra, clickExtraPress$]
  ]);

  clickPress$
    .pipe(
      mergeMap((event: TMouseWatcherEvent): Subject<TMouseWatcherEvent> | Observable<never> => {
        const subject = buttonPressMap.get(event.value);
        if (subject) subject.next(event);
        return subject ?? EMPTY;
      })
    )
    .subscribe();

  const buttonReleaseMap = new Map<MouseButtonValue | MouseWheelValue, Subject<TMouseWatcherEvent>>([
    [MouseButtonValue.Left, clickLeftRelease$],
    [MouseButtonValue.Right, clickRightRelease$],
    [MouseButtonValue.Middle, clickMiddleRelease$],
    [MouseButtonValue.Back, clickBackRelease$],
    [MouseButtonValue.Forward, clickForwardRelease$],
    [MouseButtonValue.Extra, clickExtraRelease$]
  ]);

  clickRelease$
    .pipe(
      mergeMap((event: TMouseWatcherEvent): Subject<TMouseWatcherEvent> | Observable<never> => {
        const subject = buttonReleaseMap.get(event.value);
        if (subject) subject.next(event);
        return subject ?? EMPTY;
      })
    )
    .subscribe();

  const mergeSub$: Subscription = merge(
    clickLeftPress$.pipe(map((): TMouseStateUpdate => ({ state$: isLeftPressed$, value: true }))),
    clickRightPress$.pipe(map((): TMouseStateUpdate => ({ state$: isRightPressed$, value: true }))),
    clickMiddlePress$.pipe(map((): TMouseStateUpdate => ({ state$: isMiddlePressed$, value: true }))),
    clickBackPress$.pipe(map((): TMouseStateUpdate => ({ state$: isBackPressed$, value: true }))),
    clickForwardPress$.pipe(map((): TMouseStateUpdate => ({ state$: isForwardPressed$, value: true }))),
    clickExtraPress$.pipe(map((): TMouseStateUpdate => ({ state$: isExtraPressed$, value: true }))),
    clickLeftRelease$.pipe(map((): TMouseStateUpdate => ({ state$: isLeftPressed$, value: false }))),
    clickRightRelease$.pipe(map((): TMouseStateUpdate => ({ state$: isRightPressed$, value: false }))),
    clickMiddleRelease$.pipe(map((): TMouseStateUpdate => ({ state$: isMiddlePressed$, value: false }))),
    clickBackRelease$.pipe(map((): TMouseStateUpdate => ({ state$: isBackPressed$, value: false }))),
    clickForwardRelease$.pipe(map((): TMouseStateUpdate => ({ state$: isForwardPressed$, value: false }))),
    clickExtraRelease$.pipe(map((): TMouseStateUpdate => ({ state$: isExtraPressed$, value: false })))
  ).subscribe(({ state$, value }: TMouseStateUpdate): void => state$.next(value));

  doubleClick$.pipe(filter((event: TMouseWatcherEvent): boolean => event.value === MouseButtonValue.Left)).subscribe((event: TMouseWatcherEvent): void => doubleLeftClick$.next(event));
  doubleClick$.pipe(filter((event: TMouseWatcherEvent): boolean => event.value === MouseButtonValue.Right)).subscribe((event: TMouseWatcherEvent): void => doubleRightClick$.next(event));

  wheel$.pipe(filter((event: TMouseWatcherEvent): boolean => event.value === MouseWheelValue.WheelUp)).subscribe((event: TMouseWatcherEvent): void => wheelUp$.next(event));
  wheel$.pipe(filter((event: TMouseWatcherEvent): boolean => event.value === MouseWheelValue.WheelDown)).subscribe((event: TMouseWatcherEvent): void => wheelDown$.next(event));

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

    mergeSub$.unsubscribe();
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
