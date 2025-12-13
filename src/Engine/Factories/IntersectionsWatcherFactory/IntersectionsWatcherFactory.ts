import type { IIntersectionsWatcherRegistry } from '@/Engine/Registries';
import { IntersectionsWatcherRegistry } from '@/Engine/Registries';
import type { IIntersectionsWatcher, IMousePositionWatcher } from '@/Engine/Watchers';
import { IntersectionsWatcher } from '@/Engine/Watchers';

import type { IIntersectionsWatcherFactory } from './Models';
import { IActorWrapper, ICameraWrapper } from '@/Engine';

export function IntersectionsWatcherFactory(): IIntersectionsWatcherFactory {
  const registry: IIntersectionsWatcherRegistry = IntersectionsWatcherRegistry();

  return {
    create(actors: ReadonlyArray<IActorWrapper>, camera: Readonly<ICameraWrapper>, positionWatcher: Readonly<IMousePositionWatcher>, tags?: ReadonlyArray<string>): IIntersectionsWatcher {
      const watcher: IIntersectionsWatcher = IntersectionsWatcher(actors, camera, positionWatcher, tags);
      registry.add(watcher);
      return watcher;
    }
  };
}
