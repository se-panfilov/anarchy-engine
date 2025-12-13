import type { TAbstractWatcherWithState } from '@/Engine/Abstract';

export type TWatcherWithState<T> = TAbstractWatcherWithState<T> &
  Readonly<{
    start: () => TWatcherWithState<T>;
    stop: () => TWatcherWithState<T>;
  }>;
