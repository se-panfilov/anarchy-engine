import type { TAbstractService } from '@Anarchy/Engine/Abstract';
import { AbstractService, WatcherTag } from '@Anarchy/Engine/Abstract';
import type { TContainerDecorator } from '@Anarchy/Engine/Global';
import { KeyWatcherType } from '@Anarchy/Engine/Keyboard';
import type { TKeyboardService, TKeyWatcher, TKeyWatcherFactory, TKeyWatcherRegistry } from '@Anarchy/Engine/Keyboard/Models';
import type { TSpaceLoops } from '@Anarchy/Engine/Space';
import { checkKey } from '@rwh/keystrokes';
import type { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';

export function KeyboardService(container: TContainerDecorator, keyWatcherFactory: TKeyWatcherFactory, keyWatcherRegistry: TKeyWatcherRegistry, { keyboardLoop }: TSpaceLoops): TKeyboardService {
  keyWatcherFactory.entityCreated$.subscribe((watcher: TKeyWatcher): void => keyWatcherRegistry.add(watcher));

  const keyPressWatcher: TKeyWatcher = keyWatcherFactory.create({ type: KeyWatcherType.Press, container, tags: [WatcherTag.Initial, WatcherTag.Global] }, undefined);
  keyPressWatcher.enabled$.next(true);

  const keyReleaseWatcher: TKeyWatcher = keyWatcherFactory.create({ type: KeyWatcherType.Release, container, tags: [WatcherTag.Initial, WatcherTag.Global] }, undefined);
  keyReleaseWatcher.enabled$.next(true);

  const abstractService: TAbstractService = AbstractService([keyWatcherFactory, keyWatcherRegistry]);

  keyPressWatcher.value$
    .pipe(
      distinctUntilChanged((p: KeyboardEvent, c: KeyboardEvent): boolean => {
        return p.code === c.code;
        // return false;
      })
    )
    .subscribe((v) => {
      console.log('XXX2', v);
    });

  // TODO:
  //  - Listen events from container (not window)
  //  - sort combo priority by combo length (longer first)
  //  - ignore inputs
  //  - remove listeners on destroy
  //  - remove extra models

  function isTextInputTarget(target: EventTarget | null | undefined): boolean {
    if (!(target instanceof HTMLElement)) return false;
    const tag: string = target.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return true;
    if (target.isContentEditable) return true;

    return false;
  }

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    keyWatcherRegistry.destroy$.next();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    isPressed: checkKey
  });
}
