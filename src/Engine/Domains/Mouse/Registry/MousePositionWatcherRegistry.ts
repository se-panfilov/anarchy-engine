import { AbstractRegistry, RegistryFacade } from '@Engine/Domains/Abstract';
import { RegistryType } from '@Engine/Registries';

import type { IMousePositionWatcher, IMousePositionWatcherRegistry } from '../Models';

export const MousePositionWatcherRegistry = (): IMousePositionWatcherRegistry => RegistryFacade(AbstractRegistry<IMousePositionWatcher>(RegistryType.MousePositionWatcher));
