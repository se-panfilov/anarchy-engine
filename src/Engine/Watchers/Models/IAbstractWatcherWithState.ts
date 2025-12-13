import type { IAbstractWatcher } from '@Engine/Watchers';
import type { BehaviorSubject } from 'rxjs';

export type IAbstractWatcherWithState<T> = IAbstractWatcher<T> &
  Readonly<{
    latest$: BehaviorSubject<T>;
  }>;
