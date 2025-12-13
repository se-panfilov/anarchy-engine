import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractWatcherRegistry } from '@/Engine/Abstract/Registries';
import type { TIntersectionsWatcher, TIntersectionsWatcherRegistry } from '@/Engine/Intersections/Models';

export function IntersectionsWatcherRegistry(): TIntersectionsWatcherRegistry {
  return AbstractWatcherRegistry<TIntersectionsWatcher>(RegistryType.IntersectionsWatcher);
}
