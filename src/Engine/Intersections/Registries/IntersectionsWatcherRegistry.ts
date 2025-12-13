import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractWatcherRegistry } from '@/Engine/Abstract/Registries';
import type { TIntersectionsWatcher, TIntersectionsWatcherRegistry } from '@/Engine/Intersections/Models';

export const IntersectionsWatcherRegistry = (): TIntersectionsWatcherRegistry => AbstractWatcherRegistry<TIntersectionsWatcher>(RegistryType.IntersectionsWatcher);
