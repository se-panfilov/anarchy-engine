import type { IAbstractWatcherWithState } from './IAbstractWatcherWithState';
import type { IMultitonRegistrable } from '@Engine/Mixins';

export type IMultitonWatcherWithState<T> = IMultitonRegistrable &
  // IWatcherWithState<T> &
  IAbstractWatcherWithState<T> &
  Readonly<{
    //same as IWatcher<T>
    start: () => IMultitonWatcherWithState<T>;
    stop: () => IMultitonWatcherWithState<T>;
  }>;
