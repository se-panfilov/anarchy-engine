import { IMultitonRegistrable } from '@Engine/Models';
import { IAbstractWatcher } from '@Engine/Watchers/Models';

export type IMultitonWatcher<T> = IMultitonRegistrable &
  // IWatcher<T> &
  IAbstractWatcher<T> &
  Readonly<{
    start: () => IMultitonWatcher<T>;
    stop: () => IMultitonWatcher<T>;
  }>;
