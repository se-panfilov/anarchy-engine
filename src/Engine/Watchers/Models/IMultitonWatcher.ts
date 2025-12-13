import type { IMultitonRegistrable } from '@/Engine';
import { IAbstractWatcher } from '@/Engine';

export type IMultitonWatcher<T> = IMultitonRegistrable &
  // IWatcher<T> &
  IAbstractWatcher<T> &
  Readonly<{
    start: () => IMultitonWatcher<T>;
    stop: () => IMultitonWatcher<T>;
  }>;
