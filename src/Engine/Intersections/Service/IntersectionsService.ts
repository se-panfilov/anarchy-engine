import type { IActorAsyncRegistry, IActorWrapperAsync } from '@/Engine/Actor';
import type { ICameraRegistry, ICameraWrapper } from '@/Engine/Camera';
import type { IIntersectionConfig, IIntersectionsService, IIntersectionsWatcher, IIntersectionsWatcherFactory, IIntersectionsWatcherRegistry } from '@/Engine/Intersections/Models';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { mouseService } from '@/Engine/Mouse';
import { isNotDefined } from '@/Engine/Utils';

export function IntersectionsService(factory: IIntersectionsWatcherFactory, registry: IIntersectionsWatcherRegistry): IIntersectionsService {
  factory.entityCreated$.subscribe((intersectionsWatcher: IIntersectionsWatcher): void => registry.add(intersectionsWatcher));

  function buildWatcher(camera: Readonly<ICameraWrapper>): IIntersectionsWatcher {
    const watcher: IIntersectionsWatcher = factory.create({ position$: mouseService.position$ });
    watcher.setCamera(camera);
    return watcher;
  }

  function addActorsToWatcher(watcherId: string, actors: ReadonlyArray<IActorWrapperAsync>): void {
    const watcher: IIntersectionsWatcher | undefined = registry.findById(watcherId);
    if (isNotDefined(watcher)) throw new Error(`Intersections service: cannot add actors to watcher: watcher with id "${watcherId}" is not defined`);
    watcher.addActors(actors);
  }

  function buildWatcherForActorPromises(actorsPromises: ReadonlyArray<Promise<IActorWrapperAsync>>, cameraWrapper: ICameraWrapper): Promise<IIntersectionsWatcher> {
    return Promise.all(actorsPromises).then((actorWrappers: ReadonlyArray<IActorWrapperAsync>): IIntersectionsWatcher => {
      const watcher: IIntersectionsWatcher = buildWatcher(cameraWrapper);
      addActorsToWatcher(watcher.id, actorWrappers);
      return watcher;
    });
  }

  function getWatchersForFromConfigIntersections(
    actorRegistry: IActorAsyncRegistry,
    cameraRegistry: ICameraRegistry,
    intersections: ReadonlyArray<IIntersectionConfig>
  ): ReadonlyArray<Promise<IIntersectionsWatcher>> {
    return intersections.map((intersection: IIntersectionConfig) => {
      const actorsPromises: ReadonlyArray<Promise<IActorWrapperAsync>> = intersection.actorNames.map((name: string): Promise<IActorWrapperAsync> => actorRegistry.findByNameAsync(name));
      const cameraWrapper: ICameraWrapper | undefined = cameraRegistry.findByName(intersection.cameraName);
      if (isNotDefined(cameraWrapper)) throw new Error(`Intersections: Cannot find camera ("${intersection.cameraName}")`);

      return buildWatcherForActorPromises(actorsPromises, cameraWrapper);
    });
  }

  function start(watcherId: string): IIntersectionsWatcher {
    const watcher: IIntersectionsWatcher | undefined = registry.findById(watcherId);
    if (isNotDefined(watcher)) throw new Error(`Intersections service: cannot start watcher: watcher with id "${watcherId}" is not defined`);
    return watcher.start();
  }

  function stop(watcherId: string): IIntersectionsWatcher {
    const watcher: IIntersectionsWatcher | undefined = registry.findById(watcherId);
    if (isNotDefined(watcher)) throw new Error(`Intersections service: cannot stop watcher: watcher with id "${watcherId}" is not defined`);
    return watcher.stop();
  }

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    buildWatcher,
    addActorsToWatcher,
    getWatchersForFromConfigIntersections,
    start,
    stop,
    getFactory: (): IIntersectionsWatcherFactory => factory,
    getRegistry: (): IIntersectionsWatcherRegistry => registry,
    ...destroyable
  };
}
