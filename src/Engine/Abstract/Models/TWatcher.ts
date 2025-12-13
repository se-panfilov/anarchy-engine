import type { TAbstractWatcher } from './TAbstractWatcher';

export type TWatcher<T> = TAbstractWatcher<T> &
  Readonly<{
    start: () => TWatcher<T>;
    stop: () => TWatcher<T>;
  }>;
