import { bindKey, bindKeyCombo, checkKey, checkKeyCombo, unbindKey, unbindKeyCombo } from '@rwh/keystrokes';
import { interval, merge, Subject, switchMap, takeUntil, tap } from 'rxjs';

import type { IGameKey, IKeyboardRegistry, IKeyboardRegistryValues, IKeyboardService, IKeyCombo, IKeySubscription } from '@/Engine/Keyboard/Models';
import { KeyboardRegistry } from '@/Engine/Keyboard/Registry';
import { isNotDefined } from '@/Engine/Utils';

export function KeyboardService(): IKeyboardService {
  const keyboardRegistry: IKeyboardRegistry = KeyboardRegistry();

  function createKeySubscriptions(key: IGameKey | IKeyCombo): IKeySubscription {
    const subscriptions: IKeyboardRegistryValues | undefined = keyboardRegistry.getByKey(key);
    if (!subscriptions) {
      const pressed$: Subject<IGameKey | IKeyCombo> = new Subject();
      const pressing$: Subject<IGameKey | IKeyCombo> = new Subject();
      const released$: Subject<IGameKey | IKeyCombo> = new Subject();

      keyboardRegistry.add(key, { pressed$, pressing$, released$ });
      return { pressed$, pressing$, released$ };
    }
    return subscriptions;
  }

  function onKey(key: IGameKey): IKeySubscription {
    createKeySubscriptions(key);
    return bind(key, false);
  }

  function onKeyCombo(combo: IKeyCombo): IKeySubscription {
    createKeySubscriptions(combo);
    return bind(combo, true);
  }

  function bind(key: IGameKey | IKeyCombo, isCombo: boolean): IKeySubscription {
    const subjects: IKeyboardRegistryValues | undefined = keyboardRegistry.getByKey(key);
    if (isNotDefined(subjects)) throw new Error(`Key ${key} is not found in registry`);
    const { pressed$, pressing$, released$ } = subjects;

    // merge(
    //   pressed$
    //     .pipe(
    //       switchMap(() => interval(100).pipe(
    //         tap(() => pressing$.next()),
    //         takeUntil(released$))
    //       )
    //     ),
    //   released$
    // ).subscribe();

    // TODO (S.Panfilov)
    //loopService.tick$.subscribe((delta) => {
    //  if (isPressed) pressing.next();
    // })

    pressing$.next(key);

    if (isCombo) {
      bindKeyCombo(key, {
        onPressed: () => pressed$.next(key),
        // onPressedWithRepeat: () => pressing$.next(key),
        onReleased: () => released$.next(key)
      });
    } else {
      bindKey(key, {
        onPressed: () => pressed$.next(key),
        // onPressedWithRepeat: () => {
        //   console.log(key);
        //   pressing$.next(key)
        // },
        onReleased: () => released$.next(key)
      });
    }

    return { pressed$: pressed$.asObservable(), pressing$: pressing$.asObservable(), released$: released$.asObservable() };
  }

  const pauseKeyBinding = (key: IGameKey): void => unbindKey(key);
  const pauseKeyComboBinding = (combo: IKeyCombo): void => unbindKeyCombo(combo);
  const resumeKeyBinding = (key: IGameKey): void => void bind(key, false);
  const resumeKeyComboBinding = (combo: IKeyCombo): void => void bind(combo, true);

  function removeBinding(key: IGameKey | IKeyCombo, isCombo: boolean): void {
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

  const removeKeyBinding = (key: IGameKey): void => removeBinding(key, false);
  const removeKeyComboBinding = (key: IKeyCombo): void => removeBinding(key, true);

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

export const keyboardService: IKeyboardService = KeyboardService();
