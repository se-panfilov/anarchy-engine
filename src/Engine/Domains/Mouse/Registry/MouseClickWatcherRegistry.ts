import { AbstractRegistry, RegistryFacade } from '@Engine/Domains/Abstract';
import { RegistryType } from '@Engine/Registries';

import type { IMouseClickWatcher, IMouseClickWatcherRegistry } from '../Models';

export const MouseClickWatcherRegistry = (): IMouseClickWatcherRegistry => RegistryFacade(AbstractRegistry<IMouseClickWatcher>(RegistryType.MouseClickWatcher));
