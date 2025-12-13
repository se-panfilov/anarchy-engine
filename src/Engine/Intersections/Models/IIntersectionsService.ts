import type { IActorWrapperAsync } from '@/Engine/Actor';
import type { ICameraWrapper } from '@/Engine/Camera';
import type { IIntersectionsWatcher, IIntersectionsWatcherFactory, IIntersectionsWatcherRegistry } from '@/Engine/Intersections/Models';
import type { IDestroyable } from '@/Engine/Mixins';
import type { IWithFactoryService, IWithRegistryService } from '@/Engine/Space';

export type IIntersectionsService = Readonly<{
  buildWatcher: (camera: Readonly<ICameraWrapper>) => IIntersectionsWatcher;
  addActorsToWatcher: (watcherId: string, actors: ReadonlyArray<IActorWrapperAsync>) => void;
  start: (watcherId: string) => IIntersectionsWatcher;
  stop: (watcherId: string) => IIntersectionsWatcher;
}> &
  IWithFactoryService<IIntersectionsWatcherFactory> &
  IWithRegistryService<IIntersectionsWatcherRegistry> &
  IDestroyable;
