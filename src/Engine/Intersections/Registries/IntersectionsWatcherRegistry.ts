import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractSimpleRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { TIntersectionsWatcher, TIntersectionsWatcherRegistry } from '@/Engine/Intersections/Models';

export const IntersectionsWatcherRegistry = (): TIntersectionsWatcherRegistry => RegistryFacade(AbstractSimpleRegistry<TIntersectionsWatcher>(RegistryType.IntersectionsWatcher));
