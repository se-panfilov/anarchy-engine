import { bindKey, bindKeyCombo, checkKey, checkKeyCombo, unbindKey, unbindKeyCombo } from '@rwh/keystrokes';
import { Subject } from 'rxjs';

import type { TGameKey, TKeyboardRegistry, TKeyboardRegistryValues, TKeyboardService, TKeyCombo, TKeySubscription } from '@/Engine/Keyboard/Models';
import { KeyboardRegistry } from '@/Engine/Keyboard/Registries';
import type { TLoopService, TLoopTimes } from '@/Engine/Loop';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function KeyboardService(loopService: TLoopService): TKeyboardService {
  const keyboardRegistry: TKeyboardRegistry = KeyboardRegistry();

  function createKeySubscriptions(key: TGameKey | TKeyCombo): TKeySubscription {
    const subscriptions: TKeyboardRegistryValues | undefined = keyboardRegistry.findByKey(key);
    if (!subscriptions) {
      const pressed$: Subject<TGameKey | TKeyCombo> = new Subject();
      const pressing$: Subject<Readonly<{ key: TGameKey | TKeyCombo; delta: TLoopTimes }>> = new Subject();
      const released$: Subject<TGameKey | TKeyCombo> = new Subject();

      keyboardRegistry.add(key, { pressed$, pressing$, released$ });
      return { pressed$, pressing$, released$ };
    }

    return subscriptions;
  }

  function onKey(key: TGameKey): TKeySubscription {
    createKeySubscriptions(key);
    return bind(key, false);
  }

  function onKeyCombo(combo: TKeyCombo): TKeySubscription {
    createKeySubscriptions(combo);
    return bind(combo, true);
  }

  function bind(key: TGameKey | TKeyCombo, isCombo: boolean): TKeySubscription {
    const subjects: TKeyboardRegistryValues | undefined = keyboardRegistry.findByKey(key);
    if (isNotDefined(subjects)) throw new Error(`Key ${key} is not found in registry`);
    const { pressed$, pressing$, released$ } = subjects;

    let pressedKey: TGameKey | TKeyCombo | undefined = undefined;

    loopService.tick$.subscribe((delta) => {
      if (isDefined(pressedKey)) pressing$.next({ key: pressedKey, delta });
    });

    if (isCombo) {
      bindKeyCombo(key, {
        onPressed: () => {
          pressedKey = key;
          pressed$.next(key);
        },
        onReleased: () => {
          pressedKey = undefined;
          released$.next(key);
        }
      });
    } else {
      bindKey(key, {
        onPressed: () => {
          pressedKey = key;
          pressed$.next(key);
        },
        onReleased: () => {
          pressedKey = undefined;
          released$.next(key);
        }
      });
    }

    return { pressed$: pressed$.asObservable(), pressing$: pressing$.asObservable(), released$: released$.asObservable() };
  }

  const pauseKeyBinding = (key: TGameKey): void => unbindKey(key);
  const pauseKeyComboBinding = (combo: TKeyCombo): void => unbindKeyCombo(combo);
  const resumeKeyBinding = (key: TGameKey): void => void bind(key, false);
  const resumeKeyComboBinding = (combo: TKeyCombo): void => void bind(combo, true);

  function removeBinding(key: TGameKey | TKeyCombo, isCombo: boolean): void {
    if (isCombo) {
      unbindKeyCombo(key);
    } else {
      unbindKey(key);
    }

    const subjects: TKeyboardRegistryValues | undefined = keyboardRegistry.findByKey(key);
    if (isNotDefined(subjects)) throw new Error(`Cannot remove key "${key}": it's not in the registry`);
    subjects.pressed$.complete();
    subjects.pressing$.complete();
    subjects.released$.complete();
    keyboardRegistry.remove(key);
  }

  const removeKeyBinding = (key: TGameKey): void => removeBinding(key, false);
  const removeKeyComboBinding = (key: TKeyCombo): void => removeBinding(key, true);

  return {
    onKey,
    onKeyCombo,
    pauseKeyBinding,
    pauseKeyComboBinding,
    resumeKeyBinding,
    resumeKeyComboBinding,
    removeKeyBinding,
    removeKeyComboBinding,
    isKeyPressed: checkKey,
    isKeyComboPressed: checkKeyCombo
  };
}
