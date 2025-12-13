import { AbstractRegistry } from '@Engine/Domains/Abstract';
import { RegistryFacade } from '@Engine/Mixins';
import { RegistryName } from '@Engine/Registries';

import type { IMouseClicksWatcher, IMouseClicksWatcherRegistry } from '../Models';

export const MouseClicksWatcherRegistry = (): IMouseClicksWatcherRegistry => RegistryFacade(AbstractRegistry<IMouseClicksWatcher>(RegistryName.MouseClicksWatcher));
