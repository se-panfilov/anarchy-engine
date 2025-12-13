import type { IActorWrapperAsync } from '@/Engine/Actor';
import type { ICameraWrapper } from '@/Engine/Camera';
import type { IIntersectionsService, IIntersectionsWatcher, IIntersectionsWatcherFactory, IIntersectionsWatcherRegistry } from '@/Engine/Intersections/Models';
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
    start,
    stop,
    getFactory: (): IIntersectionsWatcherFactory => factory,
    getRegistry: (): IIntersectionsWatcherRegistry => registry,
    ...destroyable
  };
}
