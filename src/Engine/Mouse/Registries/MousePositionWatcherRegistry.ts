import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from 'src/Engine/Abstract/Registries';
import type { IMousePositionWatcher, IMousePositionWatcherRegistry } from '@/Engine/Mouse/Models';

export const MousePositionWatcherRegistry = (): IMousePositionWatcherRegistry => RegistryFacade(AbstractEntityRegistry<IMousePositionWatcher>(RegistryType.MousePositionWatcher));
