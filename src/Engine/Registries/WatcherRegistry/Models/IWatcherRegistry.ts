import type { IProtectedRegistry } from '@/Engine/Models';
import type { IWatcher } from '@/Engine/Watchers';

export type IWatcherRegistry<T extends IWatcher<void>> = {
  getByContainerId: (id: string) => T | undefined;
} & IProtectedRegistry<T>;
