import { AbstractRegistry } from '@Engine/Domains/Abstract';
import type { IMousePositionWatcherRegistry } from '@Engine/Registries';
import { RegistryFacade, RegistryName } from '@Engine/Registries';
import type { IMousePositionWatcher } from '@Engine/Watchers';

export const MousePositionWatcherRegistry = (): IMousePositionWatcherRegistry => RegistryFacade(AbstractRegistry<IMousePositionWatcher>(RegistryName.MousePositionWatcher));
