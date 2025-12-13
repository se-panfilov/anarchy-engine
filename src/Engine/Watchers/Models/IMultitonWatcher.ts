import type { IMultitonRegistrable, IWatcher } from '@/Engine';

export type IMultitonWatcher<T> = IMultitonRegistrable &
  IWatcher<T> &
  Readonly<{
    start: () => IMultitonWatcher<T>;
    stop: () => IMultitonWatcher<T>;
  }>;
