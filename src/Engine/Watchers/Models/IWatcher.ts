import type { IAbstractWatcher } from './IAbstractWatcher';

export type IWatcher<T> = IAbstractWatcher<T> &
  Readonly<{
    start: () => void;
    stop: () => void;
  }>;
