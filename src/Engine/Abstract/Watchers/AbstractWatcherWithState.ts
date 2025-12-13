import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import type { WatcherType } from '@/Engine/Abstract/Constants';
import type { TAbstractWatcher, TAbstractWatcherWithState } from '@/Engine/Abstract/Models';

import { AbstractWatcher } from './AbstractWatcher';

export function AbstractWatcherWithState<T>(type: WatcherType | string, initialValue: T, tags: ReadonlyArray<string> = []): TAbstractWatcherWithState<T> {
  const abstractWatcher: TAbstractWatcher<T> = AbstractWatcher(type, undefined, tags);
  // TODO Do we really need latest$?
  const latest$: BehaviorSubject<T> = new BehaviorSubject<T>(initialValue);

  abstractWatcher.value$.subscribe(latest$);

  const abstractWatcherSubscription$: Subscription = abstractWatcher.destroy$.subscribe((): void => {
    latest$.complete();
    latest$.unsubscribe();
    abstractWatcher.value$.complete();
    abstractWatcher.value$.unsubscribe();
    abstractWatcherSubscription$.unsubscribe();
  });

  return {
    ...abstractWatcher,
    latest$
  };
}
