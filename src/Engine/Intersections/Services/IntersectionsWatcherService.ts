import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TActorService } from '@/Engine/Actor';
import type { TCameraService } from '@/Engine/Camera';
import type {
  TAnyIntersectionsWatcher,
  TAnyIntersectionsWatcherConfig,
  TAnyIntersectionsWatcherParams,
  TIntersectionsWatcherFactory,
  TIntersectionsWatcherRegistry,
  TIntersectionsWatcherService,
  TIntersectionsWatcherServiceWithFactory,
  TIntersectionsWatcherServiceWithRegistry
} from '@/Engine/Intersections/Models';
import type { TLoopService } from '@/Engine/Loop';
import type { TDisposable } from '@/Engine/Mixins';
import { withFactoryService, withRegistryService, withSerializeAllEntities } from '@/Engine/Mixins';
import type { TMouseService } from '@/Engine/Mouse';

export function IntersectionsWatcherService(factory: TIntersectionsWatcherFactory, registry: TIntersectionsWatcherRegistry): TIntersectionsWatcherService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((watcher: TAnyIntersectionsWatcher): void => registry.add(watcher));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const create = (params: TAnyIntersectionsWatcherParams): TAnyIntersectionsWatcher => factory.create(params, undefined);
  const createFromList = (list: ReadonlyArray<TAnyIntersectionsWatcherParams>): ReadonlyArray<TAnyIntersectionsWatcher> => list.map(create);
  const createFromConfig = (
    configs: ReadonlyArray<TAnyIntersectionsWatcherConfig>,
    mouseService: TMouseService,
    cameraService: TCameraService,
    actorService: TActorService,
    loopService: TLoopService
  ): ReadonlyArray<TAnyIntersectionsWatcher> =>
    configs.map((config: TAnyIntersectionsWatcherParams): TAnyIntersectionsWatcher => create(factory.configToParams(config, mouseService, cameraService, actorService, loopService)));

  const withFactory: TIntersectionsWatcherServiceWithFactory = withFactoryService(factory);
  const withRegistry: TIntersectionsWatcherServiceWithRegistry = withRegistryService(registry);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, withFactory, withRegistry, withSerializeAllEntities<TAnyIntersectionsWatcherConfig, undefined>(registry), {
    create,
    createFromList,
    createFromConfig
  });
}
