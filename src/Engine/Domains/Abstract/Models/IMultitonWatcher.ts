import type { IAbstractWatcher } from './IAbstractWatcher';
import type { IMultitonRegistrable } from '@Engine/Mixins';

export type IMultitonWatcher<T> = IMultitonRegistrable &
  // IWatcher<T> &
  IAbstractWatcher<T> &
  Readonly<{
    start: () => IMultitonWatcher<T>;
    stop: () => IMultitonWatcher<T>;
  }>;
