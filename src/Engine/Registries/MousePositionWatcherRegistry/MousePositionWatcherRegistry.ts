import { AbstractRegistry } from '@Engine/Domains/Abstract';
import { RegistryFacade } from '@Engine/Mixins';
import type { IMousePositionWatcherRegistry } from '@Engine/Domains/Mouse';
import { RegistryName } from '@Engine/Registries';
import type { IMousePositionWatcher } from '@Engine/Domains/Mouse';

export const MousePositionWatcherRegistry = (): IMousePositionWatcherRegistry => RegistryFacade(AbstractRegistry<IMousePositionWatcher>(RegistryName.MousePositionWatcher));
