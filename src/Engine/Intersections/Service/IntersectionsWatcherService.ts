import type { IActorService } from '@/Engine/Actor';
import type { ICameraService } from '@/Engine/Camera';
import type {
  IIntersectionsWatcher,
  IIntersectionsWatcherConfig,
  IIntersectionsWatcherFactory,
  IIntersectionsWatcherParams,
  IIntersectionsWatcherRegistry,
  IIntersectionsWatcherService
} from '@/Engine/Intersections/Models';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { IMouseService } from '@/Engine/Mouse';

export function IntersectionsWatcherService(factory: IIntersectionsWatcherFactory, registry: IIntersectionsWatcherRegistry): IIntersectionsWatcherService {
  factory.entityCreated$.subscribe((watcher: IIntersectionsWatcher): void => registry.add(watcher));

  const create = (params: IIntersectionsWatcherParams): IIntersectionsWatcher => factory.create(params);
  const createFromConfig = (configs: ReadonlyArray<IIntersectionsWatcherConfig>, mouseService: IMouseService, cameraService: ICameraService, actorService: IActorService): void =>
    configs.forEach((config: IIntersectionsWatcherConfig): IIntersectionsWatcher => factory.create(factory.configToParams(config, mouseService, cameraService, actorService)));

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    create,
    createFromConfig,
    getFactory: (): IIntersectionsWatcherFactory => factory,
    getRegistry: (): IIntersectionsWatcherRegistry => registry,
    ...destroyable
  };
}
