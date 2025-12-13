import { bindKey, bindKeyCombo, unbindKey, unbindKeyCombo } from '@rwh/keystrokes';
import { Subject } from 'rxjs';

import type { IKeyboardRegistry, IKeyboardRegistryValues, IKeyboardService, IKeySubscription } from '@/Engine/Keyboard/Models';
import { KeyboardRegistry } from '@/Engine/Keyboard/Registry';
import { isNotDefined } from '@/Engine/Utils';

export function KeyboardService(): IKeyboardService {
  const keyboardRegistry: IKeyboardRegistry = KeyboardRegistry();

  function createKeySubscriptions(key: string): IKeySubscription {
    const subscriptions: IKeyboardRegistryValues | undefined = keyboardRegistry.getByKey(key);
    if (!subscriptions) {
      const pressed$: Subject<string> = new Subject();
      const pressing$: Subject<string> = new Subject();
      const released$: Subject<string> = new Subject();

      keyboardRegistry.add(key, { pressed$, pressing$, released$ });
      return { pressed$, pressing$, released$ };
    }
    return subscriptions;
  }

  function onKey(key: string): IKeySubscription {
    createKeySubscriptions(key);
    return bind(key, false);
  }

  function onKeyCombo(combo: string): IKeySubscription {
    createKeySubscriptions(combo);
    return bind(combo, true);
  }

  function bind(key: string, isCombo: boolean): IKeySubscription {
    const subjects: IKeyboardRegistryValues | undefined = keyboardRegistry.getByKey(key);
    if (isNotDefined(subjects)) throw new Error(`Key ${key} is not found in registry`);
    const { pressed$, pressing$, released$ } = subjects;

    if (isCombo) {
      bindKeyCombo(key, {
        onPressed: () => pressed$.next(key),
        onPressedWithRepeat: () => pressing$.next(key),
        onReleased: () => released$.next(key)
      });
    } else {
      bindKey(key, {
        onPressed: () => pressed$.next(key),
        onPressedWithRepeat: () => pressing$.next(key),
        onReleased: () => released$.next(key)
      });
    }

    return { pressed$: pressed$.asObservable(), pressing$: pressing$.asObservable(), released$: released$.asObservable() };
  }

  const pauseKeyBinding = (key: string): void => unbindKey(key);
  const pauseKeyComboBinding = (combo: string): void => unbindKeyCombo(combo);
  const resumeKeyBinding = (key: string): void => void bind(key, false);
  const resumeKeyComboBinding = (combo: string): void => void bind(combo, true);

  function removeBinding(key: string, isCombo: boolean): void {
    if (isCombo) {
      unbindKeyCombo(key);
    } else {
      unbindKey(key);
    }

    const subjects: IKeyboardRegistryValues | undefined = keyboardRegistry.getByKey(key);
    if (isNotDefined(subjects)) throw new Error(`Cannot remove key "${key}": it's not in the registry`);
    subjects.pressed$.complete();
    subjects.pressing$.complete();
    subjects.released$.complete();
    keyboardRegistry.remove(key);
  }

  const removeKeyBinding = (key: string): void => removeBinding(key, false);
  const removeKeyComboBinding = (key: string): void => removeBinding(key, true);

  return {
    onKey,
    onKeyCombo,
    pauseKeyBinding,
    pauseKeyComboBinding,
    resumeKeyBinding,
    resumeKeyComboBinding,
    removeKeyBinding,
    removeKeyComboBinding
  };
}

export const keyboardService = KeyboardService();
