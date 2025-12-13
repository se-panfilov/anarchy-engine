import { AbstractRegistry, RegistryFacade } from '@/Engine/Domains/Abstract';
import type { IIntersectionsWatcher, IIntersectionsWatcherRegistry } from '@/Engine/Domains/Intersections/Models';
import { RegistryType } from '@/Engine/Registries';

export const IntersectionsWatcherRegistry = (): IIntersectionsWatcherRegistry => RegistryFacade(AbstractRegistry<IIntersectionsWatcher>(RegistryType.IntersectionsWatcher));
