import { AbstractRegistry } from '@Engine/Domains/Abstract';
import { RegistryFacade } from '@Engine/Mixins';
import type { IMousePositionWatcherRegistry } from '@Engine/Registries';
import { RegistryName } from '@Engine/Registries';
import type { IMousePositionWatcher } from '@Engine/Watchers';

export const MousePositionWatcherRegistry = (): IMousePositionWatcherRegistry => RegistryFacade(AbstractRegistry<IMousePositionWatcher>(RegistryName.MousePositionWatcher));
