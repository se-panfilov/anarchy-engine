import type { IWatcher } from '@/Engine';

export type IWatcherWithContainer<T> = Readonly<{
  containerId: string;
}> &
  IWatcher<T>;
