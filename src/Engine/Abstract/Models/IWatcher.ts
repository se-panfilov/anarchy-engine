import type { IAbstractProtectedWatcher } from './IAbstractProtectedWatcher';

export type IWatcher<T> = IAbstractProtectedWatcher<T> &
  Readonly<{
    start: () => IWatcher<T>;
    stop: () => IWatcher<T>;
  }>;
