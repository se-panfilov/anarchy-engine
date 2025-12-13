import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { TIntersectionsWatcher, TIntersectionsWatcherRegistry } from '@/Engine/Intersections/Models';

export const IntersectionsWatcherRegistry = (): TIntersectionsWatcherRegistry => RegistryFacade(AbstractEntityRegistry<TIntersectionsWatcher>(RegistryType.IntersectionsWatcher));
