import type { IAbstractWatcher } from '@Engine/Domains/Abstract/Models';

export type IWatcher<T> = IAbstractWatcher<T> &
  Readonly<{
    start: () => IWatcher<T>;
    stop: () => IWatcher<T>;
  }>;
