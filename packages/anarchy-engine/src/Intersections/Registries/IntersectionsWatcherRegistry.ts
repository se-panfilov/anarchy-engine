import { RegistryType } from '@Anarchy/Engine/Abstract/Constants';
import { AbstractWatcherRegistry } from '@Anarchy/Engine/Abstract/Registries';
import type { TAnyIntersectionsWatcher, TIntersectionsWatcherRegistry } from '@Anarchy/Engine/Intersections/Models';

export function IntersectionsWatcherRegistry(): TIntersectionsWatcherRegistry {
  return AbstractWatcherRegistry<TAnyIntersectionsWatcher>(RegistryType.IntersectionsWatcher);
}
