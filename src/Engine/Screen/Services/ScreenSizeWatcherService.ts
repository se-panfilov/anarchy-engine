import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TDisposable } from '@/Engine/Mixins';
import { withFactoryService, withRegistryService } from '@/Engine/Mixins';
import type {
  TScreenSizeWatcher,
  TScreenSizeWatcherFactory,
  TScreenSizeWatcherParams,
  TScreenSizeWatcherRegistry,
  TScreenSizeWatcherService,
  TScreenSizeWatcherServiceWithFactory,
  TScreenSizeWatcherServiceWithRegistry
} from '@/Engine/Screen/Models';

export function ScreenSizeWatcherService(factory: TScreenSizeWatcherFactory, registry: TScreenSizeWatcherRegistry): TScreenSizeWatcherService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((watcher: TScreenSizeWatcher): void => registry.add(watcher));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const create = (params: TScreenSizeWatcherParams): TScreenSizeWatcher => factory.create(params, undefined);
  const createFromList = (list: ReadonlyArray<TScreenSizeWatcherParams>): ReadonlyArray<TScreenSizeWatcher> => list.map(create);

  const withFactory: TScreenSizeWatcherServiceWithFactory = withFactoryService(factory);
  const withRegistry: TScreenSizeWatcherServiceWithRegistry = withRegistryService(registry);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, withFactory, withRegistry, {
    create,
    createFromList
  });
}
