import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { TAbstractEntityRegistry, TAbstractProtectedWatcherWithState, TAbstractWatcher, TAbstractWatcherRegistry } from '@/Engine/Abstract/Models';

import { AbstractEntityRegistry } from './AbstractEntityRegistry';

export function AbstractWatcherRegistry<T extends TAbstractWatcher<any> | TAbstractProtectedWatcherWithState<any>>(type: RegistryType): TAbstractWatcherRegistry<T> {
  const abstractEntityRegistry: TAbstractEntityRegistry<T> = AbstractEntityRegistry<T>(type);

  abstractEntityRegistry.destroy$.subscribe((): void => {
    console.log('XXX destroy watcher registry', abstractEntityRegistry.id);
    abstractEntityRegistry.forEach((v: T): void => {
      console.log('XXX destroy watcher', v.name);
      v.stop$.next();
    });
  });

  return Object.assign(abstractEntityRegistry);
}
