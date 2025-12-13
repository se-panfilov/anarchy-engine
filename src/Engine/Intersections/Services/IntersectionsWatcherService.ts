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
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TMouseService } from '@/Engine/Mouse';

export function IntersectionsWatcherService(factory: TIntersectionsWatcherFactory, registry: TIntersectionsWatcherRegistry): TIntersectionsWatcherService {
  factory.entityCreated$.subscribe((watcher: TIntersectionsWatcher): void => registry.add(watcher));

  const create = (params: TIntersectionsWatcherParams): TIntersectionsWatcher => factory.create(params);
  const createFromConfig = (
    configs: ReadonlyArray<TIntersectionsWatcherConfig>,
    mouseService: TMouseService,
    cameraService: TCameraService,
    actorService: TActorService
  ): ReadonlyArray<TIntersectionsWatcher> =>
    configs.map((config: TIntersectionsWatcherConfig): TIntersectionsWatcher => create(factory.configToParams(config, mouseService, cameraService, actorService)));

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    create,
    createFromConfig,
    getFactory: (): TIntersectionsWatcherFactory => factory,
    getRegistry: (): TIntersectionsWatcherRegistry => registry,
    ...destroyable
  };
}
