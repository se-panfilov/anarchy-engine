import { AbstractRegistry, RegistryFacade, RegistryType } from '@/Engine/Domains/Abstract';
import type { IIntersectionsWatcher, IIntersectionsWatcherRegistry } from '@/Engine/Domains/Intersections/Models';

export const IntersectionsWatcherRegistry = (): IIntersectionsWatcherRegistry => RegistryFacade(AbstractRegistry<IIntersectionsWatcher>(RegistryType.IntersectionsWatcher));
