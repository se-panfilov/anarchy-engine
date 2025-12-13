import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractAsyncRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { IIntersectionsWatcherAsyncRegistry, TIntersectionsWatcher } from '@/Engine/Intersections/Models';

export const IntersectionsWatcherRegistry = (): IIntersectionsWatcherAsyncRegistry => RegistryFacade(AbstractAsyncRegistry<TIntersectionsWatcher>(RegistryType.IntersectionsWatcher));
