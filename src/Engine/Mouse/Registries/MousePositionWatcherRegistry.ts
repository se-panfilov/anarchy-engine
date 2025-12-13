import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { TMousePositionWatcher, TMousePositionWatcherRegistry } from '@/Engine/Mouse/Models';

export const MousePositionWatcherRegistry = (): TMousePositionWatcherRegistry => RegistryFacade(AbstractEntityRegistry<TMousePositionWatcher>(RegistryType.MousePositionWatcher));
