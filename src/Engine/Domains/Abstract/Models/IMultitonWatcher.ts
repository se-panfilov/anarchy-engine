import type { IMultitonRegistrable } from '../Registry/Mixin';
import type { IAbstractWatcher } from './IAbstractWatcher';

export type IMultitonWatcher<T> = IMultitonRegistrable &
  // IWatcher<T> &
  IAbstractWatcher<T> &
  Readonly<{
    start: () => IMultitonWatcher<T>;
    stop: () => IMultitonWatcher<T>;
  }>;
