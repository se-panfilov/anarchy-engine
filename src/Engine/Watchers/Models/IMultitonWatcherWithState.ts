import type { IMultitonRegistrable } from '@/Engine/Models';
import type { IWatcherWithState } from '@/Engine/Watchers';

export type IMultitonWatcherWithState<T> = IMultitonRegistrable &
  IWatcherWithState<T> &
  //   & IAbstractWatcherWithState<T>
  Readonly<{
    //same as IWatcher<T>
    start: () => IMultitonWatcherWithState<T>;
    stop: () => IMultitonWatcherWithState<T>;
  }>;
