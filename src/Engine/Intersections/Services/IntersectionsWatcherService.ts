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
  TIntersectionsWatcherService
} from '@/Engine/Intersections/Models';
import type { TLoopService } from '@/Engine/Loop';
import type { TDisposable } from '@/Engine/Mixins';
import type { TMouseService } from '@/Engine/Mouse';

export function IntersectionsWatcherService(factory: TIntersectionsWatcherFactory, registry: TIntersectionsWatcherRegistry): TIntersectionsWatcherService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((watcher: TIntersectionsWatcher): void => registry.add(watcher));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const create = (params: TIntersectionsWatcherParams): TIntersectionsWatcher => factory.create(params);
  const createFromConfig = (
    configs: ReadonlyArray<TIntersectionsWatcherConfig>,
    mouseService: TMouseService,
    cameraService: TCameraService,
    actorService: TActorService,
    loopService: TLoopService
  ): ReadonlyArray<TIntersectionsWatcher> =>
    configs.map((config: TIntersectionsWatcherConfig): TIntersectionsWatcher => create(factory.configToParams(config, mouseService, cameraService, actorService, loopService)));

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    create,
    createFromConfig,
    getFactory: (): TIntersectionsWatcherFactory => factory,
    getRegistry: (): TIntersectionsWatcherRegistry => registry
  });
}
