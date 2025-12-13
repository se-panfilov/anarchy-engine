import type { IMultitonRegistrable } from '@/Engine';

export type IMultitonWatcher<T> = IMultitonRegistrable &
  Readonly<{
    //same as IWatcher<T>
    start: () => IMultitonWatcher<T>;
    stop: () => IMultitonWatcher<T>;
  }>;
