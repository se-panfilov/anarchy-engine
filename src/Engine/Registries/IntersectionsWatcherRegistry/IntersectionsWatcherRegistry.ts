import type { IIntersectionsWatcherRegistry } from '@Engine/Registries';
import { RegistryFacade, RegistryName } from '@Engine/Registries';

import type { IIntersectionsWatcher } from '@/Engine/Watchers';

import { AbstractRegistry } from '../AbstractRegistry';

export const IntersectionsWatcherRegistry = (): IIntersectionsWatcherRegistry => RegistryFacade(AbstractRegistry<IIntersectionsWatcher>(RegistryName.IntersectionsWatcher));
