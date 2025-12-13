import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import type { WatcherType } from '@/Engine/Abstract/Constants';
import type { IAbstractWatcher, IAbstractWatcherWithState } from '@/Engine/Abstract/Models';

import { AbstractWatcher } from './AbstractWatcher';

export function AbstractWatcherWithState<T>(type: WatcherType | string, initialValue: T, tags: ReadonlyArray<string> = []): IAbstractWatcherWithState<T> {
  const abstractWatcher: IAbstractWatcher<T> = AbstractWatcher(type, tags);
  const latest$: BehaviorSubject<T> = new BehaviorSubject<T>(initialValue);

  abstractWatcher.value$.subscribe((val: T): void => {
    latest$.next(val);
  });

  const abstractWatcherSubscription$: Subscription = abstractWatcher.destroyed$.subscribe((): void => {
    latest$.unsubscribe();
    latest$.complete();
    abstractWatcher.value$.unsubscribe();
    abstractWatcherSubscription$.unsubscribe();
  });

  return {
    ...abstractWatcher,
    latest$
  };
}
