import type { IActorAsyncRegistry, IActorWrapperAsync } from '@/Engine/Actor';
import type { ICameraRegistry, ICameraWrapper } from '@/Engine/Camera';
import type {
  IIntersectionsService,
  IIntersectionsWatcher,
  IIntersectionsWatcherConfig,
  IIntersectionsWatcherFactory,
  IIntersectionsWatcherRegistry,
  IIntersectionsWatcherService
} from '@/Engine/Intersections/Models';
import { IntersectionsWatcherService } from '@/Engine/Intersections/Service/IntersectionsWatcherService';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { mouseService } from '@/Engine/Mouse';
import { isNotDefined } from '@/Engine/Utils';

export function IntersectionsService(factory: IIntersectionsWatcherFactory, registry: IIntersectionsWatcherRegistry): IIntersectionsService {
  const intersectionsWatcherService: IIntersectionsWatcherService = IntersectionsWatcherService(factory, registry);

  // TODO (S.Panfilov) CWP dow we need this service at all?

  function buildWatcher(camera: Readonly<ICameraWrapper>): IIntersectionsWatcher {
    const watcher: IIntersectionsWatcher = intersectionsWatcherService.create({ position$: mouseService.position$ });
    watcher.setCamera(camera);
    return watcher;
  }

  const addActorsToWatcher = (watcher: IIntersectionsWatcher, actors: ReadonlyArray<IActorWrapperAsync>): void => watcher.addActors(actors);

  function buildWatcherForActorPromises(actorsPromises: ReadonlyArray<Promise<IActorWrapperAsync>>, cameraWrapper: ICameraWrapper): Promise<IIntersectionsWatcher> {
    return Promise.all(actorsPromises).then((actorWrappers: ReadonlyArray<IActorWrapperAsync>): IIntersectionsWatcher => {
      const watcher: IIntersectionsWatcher = buildWatcher(cameraWrapper);
      addActorsToWatcher(watcher, actorWrappers);
      return watcher;
    });
  }

  function getWatchersForFromConfigIntersections(
    actorRegistry: IActorAsyncRegistry,
    cameraRegistry: ICameraRegistry,
    intersections: ReadonlyArray<IIntersectionsWatcherConfig>
  ): ReadonlyArray<Promise<IIntersectionsWatcher>> {
    return intersections.map((intersection: IIntersectionsWatcherConfig) => {
      const actorsPromises: ReadonlyArray<Promise<IActorWrapperAsync>> = intersection.actorNames.map((name: string): Promise<IActorWrapperAsync> => actorRegistry.findByNameAsync(name));
      const cameraWrapper: ICameraWrapper | undefined = cameraRegistry.findByName(intersection.cameraName);
      if (isNotDefined(cameraWrapper)) throw new Error(`Intersections: Cannot find camera ("${intersection.cameraName}")`);

      return buildWatcherForActorPromises(actorsPromises, cameraWrapper);
    });
  }

  function start(watcherId: string): IIntersectionsWatcher {
    const watcher: IIntersectionsWatcher | undefined = intersectionsWatcherService.getRegistry().findById(watcherId);
    if (isNotDefined(watcher)) throw new Error(`Intersections service: cannot start watcher: watcher with id "${watcherId}" is not defined`);
    return watcher.start();
  }

  function stop(watcherId: string): IIntersectionsWatcher {
    const watcher: IIntersectionsWatcher | undefined = intersectionsWatcherService.getRegistry().findById(watcherId);
    if (isNotDefined(watcher)) throw new Error(`Intersections service: cannot stop watcher: watcher with id "${watcherId}" is not defined`);
    return watcher.stop();
  }

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    intersectionsWatcherService.destroy();
  });

  return {
    buildWatcher,
    addActorsToWatcher,
    getWatchersForFromConfigIntersections,
    start,
    stop,
    getFactory: (): IIntersectionsWatcherFactory => intersectionsWatcherService.getFactory(),
    getRegistry: (): IIntersectionsWatcherRegistry => intersectionsWatcherService.getRegistry(),
    ...destroyable
  };
}
