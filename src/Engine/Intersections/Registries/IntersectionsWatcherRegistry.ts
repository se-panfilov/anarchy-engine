import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Engine/Abstract/Registries';
import type { TIntersectionsWatcher, TIntersectionsWatcherRegistry } from '@/Engine/Intersections/Models';

export const IntersectionsWatcherRegistry = (): TIntersectionsWatcherRegistry => AbstractEntityRegistry<TIntersectionsWatcher>(RegistryType.IntersectionsWatcher);
