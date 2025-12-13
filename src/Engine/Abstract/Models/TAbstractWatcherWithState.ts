import type { BehaviorSubject } from 'rxjs';

import type { TAbstractWatcher } from './TAbstractWatcher';

export type TAbstractWatcherWithState<T> = TAbstractWatcher<T> &
  Readonly<{
    latest$: BehaviorSubject<T>;
  }>;
