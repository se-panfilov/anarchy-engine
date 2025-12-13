import type { BehaviorSubject } from 'rxjs';

import type { IAbstractWatcher } from './IAbstractWatcher';

export type IAbstractWatcherWithState<T> = IAbstractWatcher<T> &
  Readonly<{
    latest$: BehaviorSubject<T>;
  }>;
