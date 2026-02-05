import { RegistryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import { AbstractWatcherRegistry } from '@hellpig/anarchy-engine/Abstract/Registries';
import type { TAnyIntersectionsWatcher, TIntersectionsWatcherRegistry } from '@hellpig/anarchy-engine/Intersections/Models';

export function IntersectionsWatcherRegistry(): TIntersectionsWatcherRegistry {
  return AbstractWatcherRegistry<TAnyIntersectionsWatcher>(RegistryType.IntersectionsWatcher);
}
