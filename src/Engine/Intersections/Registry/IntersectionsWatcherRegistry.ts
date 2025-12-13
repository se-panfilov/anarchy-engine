import { AbstractRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { IIntersectionsWatcher, IIntersectionsWatcherRegistry } from '@/Engine/Intersections/Models';

export const IntersectionsWatcherRegistry = (): IIntersectionsWatcherRegistry => RegistryFacade(AbstractRegistry<IIntersectionsWatcher>(RegistryType.IntersectionsWatcher));
