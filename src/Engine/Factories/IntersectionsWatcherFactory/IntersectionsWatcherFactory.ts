import { AbstractFactory } from '@Engine/Domains/Abstract';

import type { IIntersectionsParams } from '@/Engine/Models';
import type { IIntersectionsWatcherRegistry } from '@/Engine/Registries';
import { IntersectionsWatcherRegistry } from '@/Engine/Registries';
import type { IIntersectionsWatcher } from '@/Engine/Watchers';
import { IntersectionsWatcher } from '@/Engine/Watchers';

import type { IIntersectionsWatcherFactory } from './Models';

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
