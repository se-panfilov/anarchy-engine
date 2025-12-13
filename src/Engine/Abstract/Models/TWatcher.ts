import type { TAbstractProtectedWatcher } from './TAbstractProtectedWatcher';

export type TWatcher<T> = TAbstractProtectedWatcher<T> &
  Readonly<{
    start: () => TWatcher<T>;
    stop: () => TWatcher<T>;
  }>;
