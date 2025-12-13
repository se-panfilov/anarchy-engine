import type { TAbstractService } from '@Anarchy/Engine/Abstract';
import { AbstractService, WatcherTag } from '@Anarchy/Engine/Abstract';
import type { TContainerDecorator } from '@Anarchy/Engine/Global';
import type { TGameKey, TKeyComboWatcher, TKeysPressingEvent } from '@Anarchy/Engine/Keyboard';
import { KeyWatcherType } from '@Anarchy/Engine/Keyboard';
import type { TKeyboardService, TKeyWatcher, TKeyWatcherFactory, TKeyWatcherRegistry } from '@Anarchy/Engine/Keyboard/Models';
import type { TDelta } from '@Anarchy/Engine/Loop';
import type { TSpaceLoops } from '@Anarchy/Engine/Space';
import { isDefined } from '@Anarchy/Shared/Utils';
import type { Subscription } from 'rxjs';
import { filter, map, Subject } from 'rxjs';

export function KeyboardService(container: TContainerDecorator, keyWatcherFactory: TKeyWatcherFactory, keyWatcherRegistry: TKeyWatcherRegistry, { keyboardLoop }: TSpaceLoops): TKeyboardService {
  keyWatcherFactory.entityCreated$.subscribe((watcher: TKeyWatcher | TKeyComboWatcher): void => keyWatcherRegistry.add(watcher));

  // Only focusable elements can receive keyboard events
  const element: HTMLElement = container.getElement() as HTMLElement;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(element?.tabIndex) && element?.tabIndex < 0) element.tabIndex = 0;

  const tags: ReadonlyArray<WatcherTag | string> = [WatcherTag.Initial, WatcherTag.Global];
  const keyPressWatcher: TKeyWatcher = keyWatcherFactory.create({ type: KeyWatcherType.Press, container, tags }, undefined) as TKeyWatcher;
  const keyReleaseWatcher: TKeyWatcher = keyWatcherFactory.create({ type: KeyWatcherType.Release, container, tags }, undefined) as TKeyWatcher;
  const keyComboWatcher: TKeyComboWatcher = keyWatcherFactory.create({ type: KeyWatcherType.Combo, tags }, { keyPressWatcher, keyReleaseWatcher }) as TKeyComboWatcher;

  const pressing$: Subject<TKeysPressingEvent> = new Subject<TKeysPressingEvent>();

  keyComboWatcher.enabled$.next(true);
  keyReleaseWatcher.enabled$.next(true);
  keyPressWatcher.enabled$.next(true);

  const abstractService: TAbstractService = AbstractService([keyWatcherFactory, keyWatcherRegistry]);

  const keyboardLoopSub$: Subscription = keyboardLoop.tick$
    .pipe(
      filter((): boolean => keyComboWatcher.value$.value.size > 0),
      map((v: TDelta): [TDelta, ReadonlySet<TGameKey>] => [v, keyComboWatcher.value$.value])
    )
    .subscribe(([delta, pressedKey]: [TDelta, ReadonlySet<TGameKey>]): void =>
      pressing$.next({
        keys: pressedKey,
        delta
      })
    );

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    keyboardLoopSub$.unsubscribe();

    keyWatcherRegistry.destroy$.next();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    combo$: keyComboWatcher.value$.asObservable(),
    pressed$: keyPressWatcher.value$.asObservable(),
    released$: keyReleaseWatcher.value$.asObservable(),
    pressing$: pressing$.asObservable(),
    currentKeys: keyComboWatcher.value$.value
  });
}
