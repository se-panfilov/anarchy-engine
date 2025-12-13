import type { TAbstractService } from '@Anarchy/Engine/Abstract';
import { AbstractService, WatcherTag } from '@Anarchy/Engine/Abstract';
import type { TContainerDecorator } from '@Anarchy/Engine/Global';
import type { TKeyComboWatcher } from '@Anarchy/Engine/Keyboard';
import { KeyWatcherType } from '@Anarchy/Engine/Keyboard';
import type { TKeyboardService, TKeyWatcher, TKeyWatcherFactory, TKeyWatcherRegistry } from '@Anarchy/Engine/Keyboard/Models';
import type { TSpaceLoops } from '@Anarchy/Engine/Space';
import type { Subscription } from 'rxjs';

export function KeyboardService(container: TContainerDecorator, keyWatcherFactory: TKeyWatcherFactory, keyWatcherRegistry: TKeyWatcherRegistry, { keyboardLoop }: TSpaceLoops): TKeyboardService {
  keyWatcherFactory.entityCreated$.subscribe((watcher: TKeyWatcher | TKeyComboWatcher): void => keyWatcherRegistry.add(watcher));

  const tags: ReadonlyArray<WatcherTag | string> = [WatcherTag.Initial, WatcherTag.Global];
  const keyPressWatcher: TKeyWatcher = keyWatcherFactory.create({ type: KeyWatcherType.Press, container, tags }, undefined) as TKeyWatcher;
  const keyReleaseWatcher: TKeyWatcher = keyWatcherFactory.create({ type: KeyWatcherType.Release, container, tags }, undefined) as TKeyWatcher;
  const keyComboWatcher: TKeyComboWatcher = keyWatcherFactory.create({ type: KeyWatcherType.Combo, tags }, { keyPressWatcher, keyReleaseWatcher }) as TKeyComboWatcher;

  keyComboWatcher.enabled$.next(true);
  keyReleaseWatcher.enabled$.next(true);
  keyPressWatcher.enabled$.next(true);

  const abstractService: TAbstractService = AbstractService([keyWatcherFactory, keyWatcherRegistry]);

  keyComboWatcher.value$.pipe().subscribe((v) => {
    console.log('XXX2', v, keyComboWatcher.getValue());
  });

  // TODO:
  //  - Listen events from container (not window)
  //  - sort combo priority by combo length (longer first)
  //  - ignore input fields
  //  - remove listeners on destroy
  //  - remove extra models
  //  - send pressing event in keyboard loop (avoid deps on hardware)

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    keyWatcherRegistry.destroy$.next();
  });

  return abstractService;
}
