import { RegistryType } from '@/Abstract/Constants';
import { AbstractWatcherRegistry } from '@/Abstract/Registries';
import type { TAnyIntersectionsWatcher, TIntersectionsWatcherRegistry } from '@/Intersections/Models';

export function IntersectionsWatcherRegistry(): TIntersectionsWatcherRegistry {
  return AbstractWatcherRegistry<TAnyIntersectionsWatcher>(RegistryType.IntersectionsWatcher);
}
