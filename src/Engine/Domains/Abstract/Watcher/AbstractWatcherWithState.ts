import { BehaviorSubject } from 'rxjs';

import type { WatcherType } from '@/Engine/Domains/Abstract/Constants';

import type { IAbstractWatcher, IAbstractWatcherWithState } from '../Models';
import { AbstractWatcher } from './AbstractWatcher';

export function AbstractWatcherWithState<T>(type: WatcherType | string, initialValue: T, tags: ReadonlyArray<string> = []): IAbstractWatcherWithState<T> {
  const abstractWatcher: IAbstractWatcher<T> = AbstractWatcher(type, tags);
  const latest$: BehaviorSubject<T> = new BehaviorSubject<T>(initialValue);

  abstractWatcher.value$.subscribe((val: T) => latest$.next(val));

  abstractWatcher.destroy$.subscribe(() => {
    latest$.complete();
    abstractWatcher.value$.unsubscribe();
    abstractWatcher.destroy$.unsubscribe();
  });

  return {
    ...abstractWatcher,
    latest$
  };
}
