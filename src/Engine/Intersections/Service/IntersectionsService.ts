import type { IActorWrapperAsync } from '@/Engine/Actor';
import type { ICameraWrapper } from '@/Engine/Camera';
import { ambientContext } from '@/Engine/Context';
import { IntersectionsWatcherFactory } from '@/Engine/Intersections/Factory';
import type { IIntersectionsService, IIntersectionsWatcher, IIntersectionsWatcherFactory, IIntersectionsWatcherRegistry } from '@/Engine/Intersections/Models';
import { IntersectionsWatcherRegistry } from '@/Engine/Intersections/Registry';
import { isNotDefined } from '@/Engine/Utils';

function IntersectionsService(): IIntersectionsService {
  //build intersections watcher
  const intersectionsWatcherFactory: IIntersectionsWatcherFactory = IntersectionsWatcherFactory();
  const intersectionsWatcherRegistry: IIntersectionsWatcherRegistry = IntersectionsWatcherRegistry();

  intersectionsWatcherFactory.entityCreated$.subscribe((intersectionsWatcher: IIntersectionsWatcher): void => {
    intersectionsWatcherRegistry.add(intersectionsWatcher);
  });

  function buildWatcher(camera: Readonly<ICameraWrapper>): IIntersectionsWatcher {
    const watcher: IIntersectionsWatcher = intersectionsWatcherFactory.create({ mousePosWatcher: ambientContext.mousePositionWatcher });
    watcher.setCamera(camera);
    return watcher;
  }

  function addActorsToWatcher(watcherId: string, actors: ReadonlyArray<IActorWrapperAsync>): void {
    const watcher: IIntersectionsWatcher | undefined = intersectionsWatcherRegistry.getById(watcherId);
    if (isNotDefined(watcher)) throw new Error(`Intersections service: cannot add actors to watcher: watcher with id ${watcherId} is not defined`);
    watcher.addActors(actors);
  }

  function start(watcherId: string): IIntersectionsWatcher {
    const watcher: IIntersectionsWatcher | undefined = intersectionsWatcherRegistry.getById(watcherId);
    if (isNotDefined(watcher)) throw new Error(`Intersections service: cannot start watcher: watcher with id ${watcherId} is not defined`);
    return watcher.start();
  }

  return {
    buildWatcher,
    addActorsToWatcher,
    start
  };
}

export const intersectionsService = IntersectionsService();
