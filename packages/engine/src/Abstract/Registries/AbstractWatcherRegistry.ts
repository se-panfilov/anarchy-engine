import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { TAbstractEntityRegistry, TAbstractProtectedWatcherWithState, TAbstractWatcher, TAbstractWatcherRegistry } from '@/Engine/Abstract/Models';

import { AbstractEntityRegistry } from './AbstractEntityRegistry';

export function AbstractWatcherRegistry<T extends TAbstractWatcher<any> | TAbstractProtectedWatcherWithState<any>>(type: RegistryType): TAbstractWatcherRegistry<T> {
  const abstractEntityRegistry: TAbstractEntityRegistry<T> = AbstractEntityRegistry<T>(type);

  abstractEntityRegistry.destroy$.subscribe((): void => {
    abstractEntityRegistry.forEach((v: T): void => {
      v.enabled$.next(false);
    });
  });

  return Object.assign(abstractEntityRegistry);
}
