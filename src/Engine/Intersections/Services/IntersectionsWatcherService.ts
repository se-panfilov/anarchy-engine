import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TActorService } from '@/Engine/Actor';
import type { TCameraService } from '@/Engine/Camera';
import type {
  TIntersectionsWatcher,
  TIntersectionsWatcherConfig,
  TIntersectionsWatcherFactory,
  TIntersectionsWatcherParams,
  TIntersectionsWatcherRegistry,
  TIntersectionsWatcherService,
  TIntersectionsWatcherServiceWithFactory,
  TIntersectionsWatcherServiceWithRegistry
} from '@/Engine/Intersections/Models';
import type { TLoopService } from '@/Engine/Loop';
import type { TDisposable } from '@/Engine/Mixins';
import { withFactoryService, withRegistryService } from '@/Engine/Mixins';
import type { TMouseService } from '@/Engine/Mouse';

export function IntersectionsWatcherService(factory: TIntersectionsWatcherFactory, registry: TIntersectionsWatcherRegistry): TIntersectionsWatcherService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((watcher: TIntersectionsWatcher): void => registry.add(watcher));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const create = (params: TIntersectionsWatcherParams): TIntersectionsWatcher => factory.create(params, undefined, undefined);
  const createFromList = (list: ReadonlyArray<TIntersectionsWatcherParams>): ReadonlyArray<TIntersectionsWatcher> =>
    list.map((params: TIntersectionsWatcherParams): TIntersectionsWatcher => create(params));
  const createFromConfig = (
    configs: ReadonlyArray<TIntersectionsWatcherConfig>,
    mouseService: TMouseService,
    cameraService: TCameraService,
    actorService: TActorService,
    loopService: TLoopService
  ): ReadonlyArray<TIntersectionsWatcher> =>
    configs.map((config: TIntersectionsWatcherConfig): TIntersectionsWatcher => create(factory.configToParams(config, mouseService, cameraService, actorService, loopService)));

  const withFactory: TIntersectionsWatcherServiceWithFactory = withFactoryService(factory);
  const withRegistry: TIntersectionsWatcherServiceWithRegistry = withRegistryService(registry);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, withFactory, withRegistry, {
    create,
    createFromList,
    createFromConfig
  });
}
