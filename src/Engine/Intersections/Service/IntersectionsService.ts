import type { IActorWrapperAsync } from '@/Engine/Actor';
import type { ICameraWrapper } from '@/Engine/Camera';
import { ambientContext } from '@/Engine/Context';
import { IntersectionsWatcherFactory } from '@/Engine/Intersections/Factory';
import type { IIntersectionsService, IIntersectionsWatcher, IIntersectionsWatcherFactory, IIntersectionsWatcherRegistry } from '@/Engine/Intersections/Models';
import { IntersectionsWatcherRegistry } from '@/Engine/Intersections/Registry';

function IntersectionsService(): IIntersectionsService {
  //build intersections watcher
  const intersectionsWatcherFactory: IIntersectionsWatcherFactory = IntersectionsWatcherFactory();
  const intersectionsWatcherRegistry: IIntersectionsWatcherRegistry = IntersectionsWatcherRegistry();

  intersectionsWatcherFactory.entityCreated$.subscribe((intersectionsWatcher: IIntersectionsWatcher): void => {
    intersectionsWatcherRegistry.add(intersectionsWatcher);
  });

  function buildWatcher(camera: Readonly<ICameraWrapper>): IIntersectionsWatcher {
    return intersectionsWatcherFactory.create({ mousePosWatcher: ambientContext.mousePositionWatcher });
  }

  function addActorsToWatcher(watcherId: string, actors: ReadonlyArray<IActorWrapperAsync>): void {
    // TODO (S.Panfilov) implement
    // const watcher: IIntersectionsWatcher | undefined = intersectionsWatcherRegistry.get(watcherId);
    // if (watcher) watcher.addActors(actors);
  }

  function start(watcherId: string): IIntersectionsWatcher {
    intersectionsWatcher.start(camera);
    return intersectionsWatcher;
  }

  return {
    addActorsToWatcher,
    start
  };
}

export const intersectionsService = IntersectionsService();
