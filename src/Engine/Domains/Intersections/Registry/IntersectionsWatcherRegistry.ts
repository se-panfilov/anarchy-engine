import { AbstractRegistry, RegistryFacade } from '@Engine/Domains/Abstract';
import { RegistryType } from '@Engine/Registries';

import type { IIntersectionsWatcher, IIntersectionsWatcherRegistry } from '@/Engine/Domains/Intersections/Models';

export const IntersectionsWatcherRegistry = (): IIntersectionsWatcherRegistry => RegistryFacade(AbstractRegistry<IIntersectionsWatcher>(RegistryType.IntersectionsWatcher));
