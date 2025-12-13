import { AbstractRegistry, RegistryFacade } from '@Engine/Domains/Abstract';
import { RegistryType } from '@Engine/Registries';

import type { IMouseClicksWatcher, IMouseClicksWatcherRegistry } from '../Models';

export const MouseClicksWatcherRegistry = (): IMouseClicksWatcherRegistry => RegistryFacade(AbstractRegistry<IMouseClicksWatcher>(RegistryType.MouseClicksWatcher));
