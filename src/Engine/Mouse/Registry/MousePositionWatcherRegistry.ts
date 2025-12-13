import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { IMousePositionWatcher, IMousePositionWatcherRegistry } from '@/Engine/Mouse/Models';

export const MousePositionWatcherRegistry = (): IMousePositionWatcherRegistry => RegistryFacade(AbstractEntityRegistry<IMousePositionWatcher>(RegistryType.MousePositionWatcher));
