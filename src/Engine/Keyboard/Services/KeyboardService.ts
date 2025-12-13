import { bindKey, bindKeyCombo, checkKey, checkKeyCombo, unbindKey, unbindKeyCombo } from '@rwh/keystrokes';
import type { Subscription } from 'rxjs';
import { filter, map, Subject } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TGameKey, TKeyboardLoop, TKeyboardPressingEvent, TKeyboardRegistry, TKeyboardRegistryValues, TKeyboardService, TKeyCombo, TKeySubscription } from '@/Engine/Keyboard/Models';
import { KeyboardRegistry } from '@/Engine/Keyboard/Registries';
import type { TDelta } from '@/Engine/Loop';
import type { TDisposable } from '@/Engine/Mixins';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function KeyboardService(keyboardLoop: TKeyboardLoop): TKeyboardService {
  const keyboardRegistry: TKeyboardRegistry = KeyboardRegistry();
  const disposable: ReadonlyArray<TDisposable> = [keyboardRegistry];
  const abstractService: TAbstractService = AbstractService(disposable);

  function createKeySubscriptions(key: TGameKey | TKeyCombo): TKeySubscription {
    const subscriptions: TKeyboardRegistryValues | undefined = keyboardRegistry.findByKey(key);
    if (!subscriptions) {
      const pressed$: Subject<TGameKey | TKeyCombo> = new Subject();
      const pressing$: Subject<TKeyboardPressingEvent> = new Subject();
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

    keyboardLoop.tick$
      .pipe(
        filter((): boolean => isDefined(pressedKey)),
        map((v: TDelta): [TDelta, TGameKey | TKeyCombo] => [v, pressedKey as TGameKey | TKeyCombo])
      )
      .subscribe(([delta, pressedKey]: [TDelta, TGameKey | TKeyCombo]): void => pressing$.next({ key: pressedKey, delta }));

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

  // TODO 14-0-0: Validate that we unbind all keys on destroy (and combos) and finish pressed$, pressing$ and released$
  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    Object.keys(keyboardRegistry.asObject()).forEach((val: string): void => {
      removeBinding(val, false);
      removeBinding(val, true);
    });

    destroySub$.unsubscribe();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
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
  });
}
