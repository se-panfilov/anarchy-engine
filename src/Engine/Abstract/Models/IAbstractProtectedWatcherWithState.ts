import type { BehaviorSubject } from 'rxjs';

import type { IAbstractProtectedWatcher } from './IAbstractProtectedWatcher';

export type IAbstractProtectedWatcherWithState<T> = IAbstractProtectedWatcher<T> &
  Readonly<{
    latest$: BehaviorSubject<T>;
  }>;
