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
import type { TMouseService } from '@/Engine/Mouse';

export function IntersectionsWatcherService(factory: TIntersectionsWatcherFactory, registry: TIntersectionsWatcherRegistry): TIntersectionsWatcherService {
  const abstractService: TAbstractService = AbstractService();
  const factorySub$: Subscription = factory.entityCreated$.subscribe((watcher: TIntersectionsWatcher): void => registry.add(watcher));

  const create = (params: TIntersectionsWatcherParams): TIntersectionsWatcher => factory.create(params);
  const createFromConfig = (
    configs: ReadonlyArray<TIntersectionsWatcherConfig>,
    mouseService: TMouseService,
    cameraService: TCameraService,
    actorService: TActorService,
    loopService: TLoopService
  ): ReadonlyArray<TIntersectionsWatcher> =>
    configs.map((config: TIntersectionsWatcherConfig): TIntersectionsWatcher => create(factory.configToParams(config, mouseService, cameraService, actorService, loopService)));

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    factorySub$.unsubscribe();

    factory.destroy$.next();
    registry.destroy$.next();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    create,
    createFromConfig,
    getFactory: (): TIntersectionsWatcherFactory => factory,
    getRegistry: (): TIntersectionsWatcherRegistry => registry
  });
}
