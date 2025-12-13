import type { TAbstractService } from '@Anarchy/Engine/Abstract';
import { AbstractService, WatcherTag } from '@Anarchy/Engine/Abstract';
import type { TContainerDecorator } from '@Anarchy/Engine/Global';
import { KeyWatcherType } from '@Anarchy/Engine/Keyboard/Constants';
import type { TKeyboardService, TKeyComboWatcher, TKeyWatcher, TKeyWatcherFactory, TKeyWatcherRegistry } from '@Anarchy/Engine/Keyboard/Models';
import { isDefined } from '@Anarchy/Shared/Utils';
import type { Subscription } from 'rxjs';

export function KeyboardService(container: TContainerDecorator, keyWatcherFactory: TKeyWatcherFactory, keyWatcherRegistry: TKeyWatcherRegistry): TKeyboardService {
  keyWatcherFactory.entityCreated$.subscribe((watcher: TKeyWatcher | TKeyComboWatcher): void => keyWatcherRegistry.add(watcher));

  // Only focusable elements can receive keyboard events
  const element: HTMLElement = container.getElement() as HTMLElement;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(element?.tabIndex) && element?.tabIndex < 0) element.tabIndex = 0;

  const tags: ReadonlyArray<WatcherTag | string> = [WatcherTag.Initial, WatcherTag.Global];
  const keyPressWatcher: TKeyWatcher = keyWatcherFactory.create({ type: KeyWatcherType.Press, container, tags }, undefined) as TKeyWatcher;
  const keyReleaseWatcher: TKeyWatcher = keyWatcherFactory.create({ type: KeyWatcherType.Release, container, tags }, undefined) as TKeyWatcher;
  const keyComboWatcher: TKeyComboWatcher = keyWatcherFactory.create({ type: KeyWatcherType.Combo, container, tags }, { keyPressWatcher, keyReleaseWatcher }) as TKeyComboWatcher;

  keyComboWatcher.enabled$.next(true);
  keyReleaseWatcher.enabled$.next(true);
  keyPressWatcher.enabled$.next(true);

  const abstractService: TAbstractService = AbstractService([keyWatcherFactory, keyWatcherRegistry]);

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    keyWatcherRegistry.destroy$.next();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    keys$: keyComboWatcher.value$.asObservable(),
    currentKeys: keyComboWatcher.value$.value.keys,
    pressed$: keyPressWatcher.value$.asObservable(),
    released$: keyReleaseWatcher.value$.asObservable()
  });
}
