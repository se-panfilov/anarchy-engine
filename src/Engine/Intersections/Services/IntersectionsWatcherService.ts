import type { TActorService } from '@/Engine/Actor';
import type { TCameraService } from '@/Engine/Camera';
import type {
  TIntersectionsWatcherAsyncRegistry,
  TIntersectionsWatcherConfig,
  TIntersectionsWatcherFactory,
  TIntersectionsWatcherParams,
  TIntersectionsWatcherService,
  TIntersectionsWatcher
} from '@/Engine/Intersections/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TMouseService } from '@/Engine/Mouse';

export function IntersectionsWatcherService(factory: TIntersectionsWatcherFactory, registry: TIntersectionsWatcherAsyncRegistry): TIntersectionsWatcherService {
  factory.entityCreated$.subscribe((watcher: TIntersectionsWatcher): void => registry.add(watcher));

  const create = (params: TIntersectionsWatcherParams): TIntersectionsWatcher => factory.create(params);
  const createFromConfigAsync = (
    configs: ReadonlyArray<TIntersectionsWatcherConfig>,
    mouseService: TMouseService,
    cameraService: TCameraService,
    actorService: TActorService
  ): Promise<ReadonlyArray<TIntersectionsWatcher>> => {
    return Promise.all(
      configs.map((config: TIntersectionsWatcherConfig): Promise<TIntersectionsWatcher> => factory.configToParamsAsync(config, mouseService, cameraService, actorService).then(factory.create))
    );
  };

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    create,
    createFromConfigAsync,
    getFactory: (): TIntersectionsWatcherFactory => factory,
    getRegistry: (): TIntersectionsWatcherAsyncRegistry => registry,
    ...destroyable
  };
}
