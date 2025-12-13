import { AbstractRegistry, RegistryFacade } from '@Engine/Domains/Abstract';
import { RegistryName } from '@Engine/Registries';

import type { IMouseClicksWatcher, IMouseClicksWatcherRegistry } from '../Models';

export const MouseClicksWatcherRegistry = (): IMouseClicksWatcherRegistry => RegistryFacade(AbstractRegistry<IMouseClicksWatcher>(RegistryName.MouseClicksWatcher));
