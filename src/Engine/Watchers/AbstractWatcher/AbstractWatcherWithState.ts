import type { IAbstractWatcher, IAbstractWatcherWithState } from '@Engine/Watchers';
import { AbstractWatcher } from '@Engine/Watchers';
import { BehaviorSubject } from 'rxjs';

export function AbstractWatcherWithState<T>(type: string, initialValue: T, tags: ReadonlyArray<string> = []): IAbstractWatcherWithState<T> {
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
