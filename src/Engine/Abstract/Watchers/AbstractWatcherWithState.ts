import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import type { WatcherType } from '@/Engine/Abstract/Constants';
import type { TAbstractWatcher, TAbstractWatcherWithState } from '@/Engine/Abstract/Models';

import { AbstractWatcher } from './AbstractWatcher';

export function AbstractWatcherWithState<T>(type: WatcherType | string, name: string, initialValue: T, tags: ReadonlyArray<string> = []): TAbstractWatcherWithState<T> {
  const abstractWatcher: Omit<TAbstractWatcher<T>, 'value$'> & { value$: BehaviorSubject<T> } = AbstractWatcher(type, name, tags) as Omit<TAbstractWatcher<T>, 'value$'> & {
    value$: BehaviorSubject<T>;
  };

  abstractWatcher.value$.complete();
  abstractWatcher.value$.unsubscribe();
  // eslint-disable-next-line functional/immutable-data
  abstractWatcher.value$ = new BehaviorSubject<T>(initialValue);

  const destroySub$: Subscription = abstractWatcher.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    abstractWatcher.value$.complete();
    abstractWatcher.value$.unsubscribe();
  });

  return {
    ...abstractWatcher,
    getValue: (): T => abstractWatcher.value$.value
  };
}
