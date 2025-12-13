import type { BehaviorSubject } from 'rxjs';

import type { TAbstractWatcher } from './TAbstractWatcher';

export type TAbstractWatcherWithState<T> = Omit<TAbstractWatcher<T>, 'value$'> &
  Readonly<{
    value$: BehaviorSubject<T>;
    getValue: () => T;
  }>;
