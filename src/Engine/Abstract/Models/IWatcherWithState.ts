import type { IAbstractWatcherWithState } from '@/Engine/Abstract';

export type IWatcherWithState<T> = IAbstractWatcherWithState<T> &
  Readonly<{
    start: () => IWatcherWithState<T>;
    stop: () => IWatcherWithState<T>;
  }>;
