import type { IMultitonRegistrable } from '@/Engine/Mixins';

import type { IAbstractProtectedWatcherWithState } from './IAbstractProtectedWatcherWithState';

export type IMultitonWatcherWithState<T> = IMultitonRegistrable &
  // IWatcherWithState<T> &
  IAbstractProtectedWatcherWithState<T> &
  Readonly<{
    //same as IWatcher<T>
    start: () => IMultitonWatcherWithState<T>;
    stop: () => IMultitonWatcherWithState<T>;
  }>;
