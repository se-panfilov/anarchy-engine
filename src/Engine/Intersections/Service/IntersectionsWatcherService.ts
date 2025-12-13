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

export function IntersectionsWatcherService(factory: IIntersectionsWatcherFactory, registry: IIntersectionsWatcherRegistry): IIntersectionsWatcherService {
  factory.entityCreated$.subscribe((fog: IIntersectionsWatcher): void => registry.add(fog));

  const create = (params: IIntersectionsWatcherParams): IIntersectionsWatcher => factory.create(params);
  const createFromConfig = (fogs: ReadonlyArray<IIntersectionsWatcherConfig>): void =>
    fogs.forEach((fog: IIntersectionsWatcherConfig): IIntersectionsWatcher => factory.create(factory.configToParams(fog)));

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
