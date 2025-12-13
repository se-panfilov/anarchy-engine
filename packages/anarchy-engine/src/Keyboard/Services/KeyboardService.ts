import type { TAbstractService } from '@Anarchy/Engine/Abstract';
import { AbstractService, WatcherTag } from '@Anarchy/Engine/Abstract';
import type { TContainerDecorator } from '@Anarchy/Engine/Global';
import type { TKeyboardService, TKeyboardWatcher, TKeyboardWatcherFactory, TKeyboardWatcherRegistry } from '@Anarchy/Engine/Keyboard/Models';
import type { TSpaceLoops } from '@Anarchy/Engine/Space';
import { checkKey } from '@rwh/keystrokes';
import type { Subscription } from 'rxjs';

export function KeyboardService(
  container: TContainerDecorator,
  keyboardWatcherFactory: TKeyboardWatcherFactory,
  keyboardWatcherRegistry: TKeyboardWatcherRegistry,
  { keyboardLoop }: TSpaceLoops
): TKeyboardService {
  const keyboardWatcher: TKeyboardWatcher = keyboardWatcherFactory.create({ container, tags: [WatcherTag.Initial, WatcherTag.Global] }, undefined);
  keyboardWatcher.enabled$.next(true);

  const abstractService: TAbstractService = AbstractService([keyboardWatcherFactory, keyboardWatcherRegistry]);

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

    keyboardWatcherRegistry.destroy$.next();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    isPressed: checkKey
  });
}
