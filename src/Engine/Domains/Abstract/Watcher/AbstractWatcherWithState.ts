import { BehaviorSubject } from 'rxjs';

import type { WatcherType } from '@/Engine/Domains/Abstract/Constants';
import type { IAbstractWatcher, IAbstractWatcherWithState } from '@/Engine/Domains/Abstract/Models';

import { AbstractWatcher } from './AbstractWatcher';

export function AbstractWatcherWithState<T>(type: WatcherType | string, initialValue: T, tags: ReadonlyArray<string> = []): IAbstractWatcherWithState<T> {
  const abstractWatcher: IAbstractWatcher<T> = AbstractWatcher(type, tags);
  let isInternalChange: boolean = true;
  const latest$: BehaviorSubject<T> = new BehaviorSubject<T>(initialValue);

  abstractWatcher.value$.subscribe((val: T): void => {
    isInternalChange = true;
    latest$.next(val);
  });

  latest$.subscribe((val: T): void => {
    if (!isInternalChange) throw new Error(`Watcher("${type}") doesn't allow to modify "latest$" from outside. Attempt to set value: ${String(val)}`);
    isInternalChange = false;
  });

  abstractWatcher.destroy$.subscribe((): void => {
    latest$.unsubscribe();
    latest$.complete();
    abstractWatcher.value$.unsubscribe();
    abstractWatcher.destroy$.unsubscribe();
  });

  return {
    ...abstractWatcher,
    latest$
  };
}
