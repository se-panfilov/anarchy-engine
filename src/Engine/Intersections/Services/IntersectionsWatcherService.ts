import type { IActorService } from '@/Engine/Actor';
import type { ICameraService } from '@/Engine/Camera';
import type {
  TIntersectionsWatcher,
  IIntersectionsWatcherAsyncRegistry,
  IIntersectionsWatcherConfig,
  IIntersectionsWatcherFactory,
  IIntersectionsWatcherParams,
  IIntersectionsWatcherService
} from '@/Engine/Intersections/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { IMouseService } from '@/Engine/Mouse';

export function IntersectionsWatcherService(factory: IIntersectionsWatcherFactory, registry: IIntersectionsWatcherAsyncRegistry): IIntersectionsWatcherService {
  factory.entityCreated$.subscribe((watcher: TIntersectionsWatcher): void => registry.add(watcher));

  const create = (params: IIntersectionsWatcherParams): TIntersectionsWatcher => factory.create(params);
  const createFromConfigAsync = (
    configs: ReadonlyArray<IIntersectionsWatcherConfig>,
    mouseService: IMouseService,
    cameraService: ICameraService,
    actorService: IActorService
  ): Promise<ReadonlyArray<TIntersectionsWatcher>> => {
    return Promise.all(
      configs.map((config: IIntersectionsWatcherConfig): Promise<TIntersectionsWatcher> => factory.configToParamsAsync(config, mouseService, cameraService, actorService).then(factory.create))
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
    getFactory: (): IIntersectionsWatcherFactory => factory,
    getRegistry: (): IIntersectionsWatcherAsyncRegistry => registry,
    ...destroyable
  };
}
