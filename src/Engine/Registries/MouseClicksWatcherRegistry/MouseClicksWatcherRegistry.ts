import type { IMouseClicksWatcherRegistry } from '@Engine/Registries';
import { RegistryFacade, RegistryName } from '@Engine/Registries';

import type { IMouseClicksWatcher } from '@/Engine/Watchers';

import { AbstractRegistry } from '../AbstractRegistry';

export const MouseClicksWatcherRegistry = (): IMouseClicksWatcherRegistry => RegistryFacade(AbstractRegistry<IMouseClicksWatcher>(RegistryName.MouseClicksWatcher));
