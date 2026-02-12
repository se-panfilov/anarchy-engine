import type { WatcherType } from '@Anarchy/Engine/Abstract/Constants';
import type { TAbstractWatcher, TAbstractWatcherWithState } from '@Anarchy/Engine/Abstract/Models';
import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { AbstractWatcher } from './AbstractWatcher';

export function AbstractWatcherWithState<T>(type: WatcherType | string, name: string, initialValue: T, tags: ReadonlyArray<string> = []): TAbstractWatcherWithState<T> {
  const abstractWatcher: Omit<TAbstractWatcher<T>, 'value$'> & { value$: BehaviorSubject<T> } = AbstractWatcher(type, name, tags) as Omit<TAbstractWatcher<T>, 'value$'> & {
    value$: BehaviorSubject<T>;
  };

  // AbstractWatcherWithState uses BehaviorSubject instead of Subject (in AbstractWatcher), so we replace it here
  abstractWatcher.value$.complete();
  // eslint-disable-next-line functional/immutable-data
  abstractWatcher.value$ = new BehaviorSubject<T>(initialValue);

  const destroySub$: Subscription = abstractWatcher.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    abstractWatcher.value$.complete();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractWatcher, {
    getValue: (): T => abstractWatcher.value$.value
  });
}
