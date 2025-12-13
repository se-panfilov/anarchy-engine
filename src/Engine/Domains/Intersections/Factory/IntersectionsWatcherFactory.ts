import { AbstractFactory } from '@Engine/Domains/Abstract';
import type { IIntersectionsWatcher } from '@Engine/Domains/Intersections';
import { IntersectionsWatcherRegistry } from '@Engine/Domains/Intersections';
import type { IIntersectionsParams } from '@Engine/Models';
import { IntersectionsWatcher } from '@Engine/Watchers';

import type { IIntersectionsWatcherFactory, IIntersectionsWatcherRegistry } from '../Models';

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
