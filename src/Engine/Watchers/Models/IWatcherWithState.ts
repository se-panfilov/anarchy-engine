import type { IAbstractWatcherWithState } from '@Engine/Watchers';

export type IWatcherWithState<T> = IAbstractWatcherWithState<T> &
  Readonly<{
    start: () => IWatcherWithState<T>;
    stop: () => IWatcherWithState<T>;
  }>;
