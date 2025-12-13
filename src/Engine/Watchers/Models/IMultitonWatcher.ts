import type { IAbstractWatcher } from '@Engine/Domains/Abstract';
import type { IMultitonRegistrable } from '@Engine/Models';

export type IMultitonWatcher<T> = IMultitonRegistrable &
  // IWatcher<T> &
  IAbstractWatcher<T> &
  Readonly<{
    start: () => IMultitonWatcher<T>;
    stop: () => IMultitonWatcher<T>;
  }>;
