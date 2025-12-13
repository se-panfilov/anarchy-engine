import type { IWatcher } from '@/Engine';

export type IWatcherWithContainer<T> = IWatcher<T> &
  Readonly<{
    containerId: string;
  }>;
