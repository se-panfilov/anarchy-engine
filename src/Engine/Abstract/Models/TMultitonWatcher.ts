import type { TMultitonRegistrable } from '@/Engine/Mixins';

import type { TAbstractProtectedWatcher } from './TAbstractProtectedWatcher';

export type TMultitonWatcher<T> = TMultitonRegistrable &
  // IWatcher<T> &
  TAbstractProtectedWatcher<T> &
  Readonly<{
    start: () => TMultitonWatcher<T>;
    stop: () => TMultitonWatcher<T>;
  }>;
