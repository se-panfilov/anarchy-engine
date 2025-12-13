import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractAsyncRegistry, RegistryFacade } from '@/Engine/Abstract/Registry';
import type { IIntersectionsWatcher, IIntersectionsWatcherAsyncRegistry } from '@/Engine/Intersections/Models';

export const IntersectionsWatcherRegistry = (): IIntersectionsWatcherAsyncRegistry => RegistryFacade(AbstractAsyncRegistry<IIntersectionsWatcher>(RegistryType.IntersectionsWatcher));
