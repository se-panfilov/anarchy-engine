import type { IAbstractWatcher } from './IAbstractWatcher';

export type IWatcher<T> = IAbstractWatcher<T> &
  Readonly<{
    start: () => IWatcher<T>;
    stop: () => IWatcher<T>;
  }>;
