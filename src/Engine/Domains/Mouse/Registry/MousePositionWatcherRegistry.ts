import { AbstractRegistry, RegistryFacade } from '@/Engine/Domains/Abstract';
import type { IMousePositionWatcher, IMousePositionWatcherRegistry } from '@/Engine/Domains/Mouse/Models';
import { RegistryType } from '@/Engine/Registries';

export const MousePositionWatcherRegistry = (): IMousePositionWatcherRegistry => RegistryFacade(AbstractRegistry<IMousePositionWatcher>(RegistryType.MousePositionWatcher));
