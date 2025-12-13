import type { IMultitonRegistrable } from '../Registry/Mixin';
import type { IAbstractWatcherWithState } from './IAbstractWatcherWithState';

export type IMultitonWatcherWithState<T> = IMultitonRegistrable &
  // IWatcherWithState<T> &
  IAbstractWatcherWithState<T> &
  Readonly<{
    //same as IWatcher<T>
    start: () => IMultitonWatcherWithState<T>;
    stop: () => IMultitonWatcherWithState<T>;
  }>;
