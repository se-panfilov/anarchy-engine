import type { IMultitonRegistrable } from '@Engine/Domains/Mixins';

import type { IAbstractWatcherWithState } from './IAbstractWatcherWithState';

export type IMultitonWatcherWithState<T> = IMultitonRegistrable &
  // IWatcherWithState<T> &
  IAbstractWatcherWithState<T> &
  Readonly<{
    //same as IWatcher<T>
    start: () => IMultitonWatcherWithState<T>;
    stop: () => IMultitonWatcherWithState<T>;
  }>;
