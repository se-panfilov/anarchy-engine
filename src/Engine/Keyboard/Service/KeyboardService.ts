import { bindKey, unbindKey } from '@rwh/keystrokes';
import type { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { isNotDefined } from '@/Engine/Utils';

type IWatchResult = {
  pressed$: Observable<string>;
  pressing$: Observable<string>;
  released$: Observable<string>;
};

type IKeyboardRegistryValues = {
  pressed$: Subject<string>;
  pressing$: Subject<string>;
  released$: Subject<string>;
};

export function KeyboardService() {
  const registry: Map<string, IKeyboardRegistryValues> = new Map();

  // TODO (S.Panfilov) combo
  function onKey(key: string): IWatchResult {
    if (!registry.has(key)) {
      const pressed$: Subject<string> = new Subject();
      const pressing$: Subject<string> = new Subject();
      const released$: Subject<string> = new Subject();

      registry.set(key, { pressed$, pressing$, released$ });
    }

    return bind(key);
  }

  function bind(key: string): IWatchResult {
    const subjects = registry.get(key);
    if (isNotDefined(subjects)) throw new Error(`Key ${key} is not found in registry`);
    const { pressed$, pressing$, released$ } = subjects;

    bindKey(key, {
      onPressed: () => pressed$.next(key),
      onPressedWithRepeat: () => pressing$.next(key),
      onReleased: () => released$.next(key)
    });

    return { pressed$: pressed$.asObservable(), pressing$: pressing$.asObservable(), released$: released$.asObservable() };
  }

  function pauseKeyBinding(key: string): void {
    unbindKey(key);
  }

  function resumeKeyBinding(key: string): void {
    bind(key);
  }

  // TODO (S.Panfilov) combo
  function removeKeyBinding(key: string): void {
    unbindKey(key);
    registry.get(key)?.pressed$.complete();
    registry.get(key)?.pressing$.complete();
    registry.get(key)?.released$.complete();
    registry.delete(key);
  }

  // function watchKeyCombo(key: string): Observable<string> {
  //   const subj: Subject<string> = new Subject()
  //   bindKeyCombo(key, () => subj.next(key))
  //   return subj;
  // }

  return {
    onKey,
    removeKeyBinding,
    pauseKeyBinding,
    resumeKeyBinding
  };
}

export const keyboardService = KeyboardService();
