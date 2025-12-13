import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractAsyncRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { TIntersectionsWatcher, TIntersectionsWatcherAsyncRegistry } from '@/Engine/Intersections/Models';

export const IntersectionsWatcherRegistry = (): TIntersectionsWatcherAsyncRegistry => RegistryFacade(AbstractAsyncRegistry<TIntersectionsWatcher>(RegistryType.IntersectionsWatcher));
