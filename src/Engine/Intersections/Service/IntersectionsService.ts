import type { IActorWrapper } from '@/Engine/Actor';
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

  function start(actors: ReadonlyArray<IActorWrapper>, camera: Readonly<ICameraWrapper>): IIntersectionsWatcher {
    const intersectionsWatcher: IIntersectionsWatcher = intersectionsWatcherFactory.create({ mousePosWatcher: ambientContext.mousePositionWatcher });
    intersectionsWatcher.start(actors, camera);
    return intersectionsWatcher;
  }

  return {
    start
  };
}

export const intersectionsService = IntersectionsService();
