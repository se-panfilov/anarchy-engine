import { bindKey, unbindKey } from '@rwh/keystrokes';
import { Subject } from 'rxjs';

import type { IKeyboardRegistry, IKeyboardRegistryValues, IKeyboardService, IKeySubscription } from '@/Engine/Keyboard/Models';
import { KeyboardRegistry } from '@/Engine/Keyboard/Registry';
import { isNotDefined } from '@/Engine/Utils';

export function KeyboardService(): IKeyboardService {
  const keyboardRegistry: IKeyboardRegistry = KeyboardRegistry();

  // TODO (S.Panfilov) combo
  function onKey(key: string): IKeySubscription {
    if (!keyboardRegistry.getByKey(key)) {
      const pressed$: Subject<string> = new Subject();
      const pressing$: Subject<string> = new Subject();
      const released$: Subject<string> = new Subject();

      keyboardRegistry.add(key, { pressed$, pressing$, released$ });
    }

    return bind(key);
  }

  function bind(key: string): IKeySubscription {
    const subjects: IKeyboardRegistryValues | undefined = keyboardRegistry.getByKey(key);
    if (isNotDefined(subjects)) throw new Error(`Key ${key} is not found in registry`);
    const { pressed$, pressing$, released$ } = subjects;

    bindKey(key, {
      onPressed: () => pressed$.next(key),
      onPressedWithRepeat: () => pressing$.next(key),
      onReleased: () => released$.next(key)
    });

    return { pressed$: pressed$.asObservable(), pressing$: pressing$.asObservable(), released$: released$.asObservable() };
  }

  const pauseKeyBinding = (key: string): void => unbindKey(key);
  const resumeKeyBinding = (key: string): void => void bind(key);

  // TODO (S.Panfilov) combo
  function removeKeyBinding(key: string): void {
    unbindKey(key);
    const subjects: IKeyboardRegistryValues | undefined = keyboardRegistry.getByKey(key);
    if (isNotDefined(subjects)) throw new Error(`Cannot remove key "${key}": it's not in the registry`);
    subjects.pressed$.complete();
    subjects.pressing$.complete();
    subjects.released$.complete();
    keyboardRegistry.remove(key);
  }

  return {
    onKey,
    removeKeyBinding,
    pauseKeyBinding,
    resumeKeyBinding
  };
}

export const keyboardService = KeyboardService();
