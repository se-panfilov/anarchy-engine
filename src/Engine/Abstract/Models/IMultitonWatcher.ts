import type { IMultitonRegistrable } from '@/Engine/Mixins';

import type { IAbstractProtectedWatcher } from './IAbstractProtectedWatcher';

export type IMultitonWatcher<T> = IMultitonRegistrable &
  // IWatcher<T> &
  IAbstractProtectedWatcher<T> &
  Readonly<{
    start: () => IMultitonWatcher<T>;
    stop: () => IMultitonWatcher<T>;
  }>;
