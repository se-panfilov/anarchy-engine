import type { TMultitonRegistrable } from '@/Engine/Mixins';

import type { TAbstractProtectedWatcherWithState } from './TAbstractProtectedWatcherWithState';

export type TMultitonWatcherWithState<T> = TMultitonRegistrable &
  // IWatcherWithState<T> &
  TAbstractProtectedWatcherWithState<T> &
  Readonly<{
    //same as IWatcher<T>
    start: () => TMultitonWatcherWithState<T>;
    stop: () => TMultitonWatcherWithState<T>;
  }>;
