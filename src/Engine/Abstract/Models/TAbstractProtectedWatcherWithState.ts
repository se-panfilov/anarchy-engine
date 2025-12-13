import type { BehaviorSubject } from 'rxjs';

import type { TAbstractProtectedWatcher } from './TAbstractProtectedWatcher';

export type TAbstractProtectedWatcherWithState<T> = TAbstractProtectedWatcher<T> &
  Readonly<{
    latest$: BehaviorSubject<T>;
  }>;
