import type { IMultitonRegistrable } from '@Engine/Models';
import type { IAbstractWatcher } from '@Engine/Watchers/Models';

export type IMultitonWatcher<T> = IMultitonRegistrable &
  // IWatcher<T> &
  IAbstractWatcher<T> &
  Readonly<{
    start: () => IMultitonWatcher<T>;
    stop: () => IMultitonWatcher<T>;
  }>;
