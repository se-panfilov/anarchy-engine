import { AbstractFactory } from '@Engine/Domains/Abstract';

import type { IIntersectionsParams, IIntersectionsWatcher, IIntersectionsWatcherFactory, IIntersectionsWatcherRegistry } from '../Models';
import { IntersectionsWatcherRegistry } from '../Registry';
import { IntersectionsWatcher } from '../Watchers';

export function IntersectionsWatcherFactory(): IIntersectionsWatcherFactory {
  const registry: IIntersectionsWatcherRegistry = IntersectionsWatcherRegistry();

  function create({ actors, camera, positionWatcher, tags }: IIntersectionsParams): IIntersectionsWatcher {
    const watcher: IIntersectionsWatcher = IntersectionsWatcher(actors, camera, positionWatcher, tags);
    registry.add(watcher);
    return watcher;
  }

  const abstractFactory = AbstractFactory('intersections_factory', create);

  return {
    ...abstractFactory
  };
}
