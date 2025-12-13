import type { IActorAsyncRegistry, IActorWrapperAsync } from '@/Engine/Actor';
import type { ICameraRegistry, ICameraWrapper } from '@/Engine/Camera';
import type { IIntersectionsWatcher, IIntersectionsWatcherConfig, IIntersectionsWatcherFactory, IIntersectionsWatcherRegistry } from '@/Engine/Intersections/Models';
import type { IDestroyable } from '@/Engine/Mixins';
import type { IWithFactoryService, IWithRegistryService } from '@/Engine/Space';

export type IIntersectionsService = Readonly<{
  buildWatcher: (camera: Readonly<ICameraWrapper>) => IIntersectionsWatcher;
  addActorsToWatcher: (watcher: IIntersectionsWatcher, actors: ReadonlyArray<IActorWrapperAsync>) => void;
  getWatchersForFromConfigIntersections: (
    actorRegistry: IActorAsyncRegistry,
    cameraRegistry: ICameraRegistry,
    intersections: ReadonlyArray<IIntersectionsWatcherConfig>
  ) => ReadonlyArray<Promise<IIntersectionsWatcher>>;
  start: (watcherId: string) => IIntersectionsWatcher;
  stop: (watcherId: string) => IIntersectionsWatcher;
}> &
  IWithFactoryService<IIntersectionsWatcherFactory> &
  IWithRegistryService<IIntersectionsWatcherRegistry> &
  IDestroyable;
