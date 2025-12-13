import type { IWatcherRegistry } from '@/Engine/Registries';
import type { IWatcher } from '@/Engine/Watchers';
import type { IAbstractRegistry } from '@/Engine/Models';
import { RegistryFacade } from '@/Engine/Registries';

export function WatcherRegistry<T extends IWatcher<void>>(registry: IAbstractRegistry<T>): IWatcherRegistry<T> {

  function getByContainerId(id: string): T | undefined {
    // registry.registry.forEach((mcw) => {
    //   // mcw.
    // })
    return undefined;
  }

  return {
    ...RegistryFacade(registry),
    getByContainerId
  };
}
