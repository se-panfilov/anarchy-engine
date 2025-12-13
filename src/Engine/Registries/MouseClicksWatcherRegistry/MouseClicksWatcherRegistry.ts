import { AbstractRegistry } from '@Engine/Domains/Abstract';
import type { IMouseClicksWatcherRegistry } from '@Engine/Registries';
import { RegistryFacade, RegistryName } from '@Engine/Registries';

import type { IMouseClicksWatcher } from '@/Engine/Watchers';

export const MouseClicksWatcherRegistry = (): IMouseClicksWatcherRegistry => RegistryFacade(AbstractRegistry<IMouseClicksWatcher>(RegistryName.MouseClicksWatcher));
