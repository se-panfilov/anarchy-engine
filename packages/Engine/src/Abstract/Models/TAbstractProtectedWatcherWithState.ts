import type { Observable } from 'rxjs';

import type { TAbstractWatcher } from './TAbstractWatcher';

export type TAbstractProtectedWatcherWithState<T> = Omit<TAbstractWatcher<T>, 'value$'> &
  Readonly<{
    value$: Observable<T>;
    getValue: () => T;
  }>;
