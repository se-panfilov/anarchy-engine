import { AbstractRegistry } from '@Engine/Domains/Abstract';
import { RegistryFacade } from '@Engine/Mixins';
import { RegistryName } from '@Engine/Registries';

import type { IIntersectionsWatcher, IIntersectionsWatcherRegistry } from '../Models';

export const IntersectionsWatcherRegistry = (): IIntersectionsWatcherRegistry => RegistryFacade(AbstractRegistry<IIntersectionsWatcher>(RegistryName.IntersectionsWatcher));
