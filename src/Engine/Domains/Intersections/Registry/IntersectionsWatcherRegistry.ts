import { AbstractRegistry, RegistryFacade } from '@Engine/Domains/Abstract';
import { RegistryType } from '@Engine/Registries';

import type { IIntersectionsWatcher, IIntersectionsWatcherRegistry } from '../Models';

export const IntersectionsWatcherRegistry = (): IIntersectionsWatcherRegistry => RegistryFacade(AbstractRegistry<IIntersectionsWatcher>(RegistryType.IntersectionsWatcher));
