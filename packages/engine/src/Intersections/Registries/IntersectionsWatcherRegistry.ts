import { RegistryType } from '@Engine/Abstract/Constants';
import { AbstractWatcherRegistry } from '@Engine/Abstract/Registries';
import type { TAnyIntersectionsWatcher, TIntersectionsWatcherRegistry } from '@Engine/Intersections/Models';

export function IntersectionsWatcherRegistry(): TIntersectionsWatcherRegistry {
  return AbstractWatcherRegistry<TAnyIntersectionsWatcher>(RegistryType.IntersectionsWatcher);
}
