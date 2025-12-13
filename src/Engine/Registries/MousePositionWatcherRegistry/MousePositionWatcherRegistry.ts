import type { IMousePositionWatcherRegistry } from '@Engine/Registries';
import { RegistryFacade, RegistryName } from '@Engine/Registries';

import type { IMousePositionWatcher } from '@/Engine/Watchers';

import { AbstractRegistry } from '../AbstractRegistry';

export const MousePositionWatcherRegistry = (): IMousePositionWatcherRegistry => RegistryFacade(AbstractRegistry<IMousePositionWatcher>(RegistryName.MousePositionWatcher));
