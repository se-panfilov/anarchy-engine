import { AbstractRegistry } from '@Engine/Domains/Abstract';
import { RegistryFacade } from '@Engine/Mixins';
import type { IIntersectionsWatcherRegistry } from '@Engine/Registries';
import { RegistryName } from '@Engine/Registries';
import type { IIntersectionsWatcher } from '@Engine/Watchers';

export const IntersectionsWatcherRegistry = (): IIntersectionsWatcherRegistry => RegistryFacade(AbstractRegistry<IIntersectionsWatcher>(RegistryName.IntersectionsWatcher));
