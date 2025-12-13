import { AbstractRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { IMousePositionWatcher, IMousePositionWatcherRegistry } from '@/Engine/Mouse/Models';

export const MousePositionWatcherRegistry = (): IMousePositionWatcherRegistry => RegistryFacade(AbstractRegistry<IMousePositionWatcher>(RegistryType.MousePositionWatcher));
