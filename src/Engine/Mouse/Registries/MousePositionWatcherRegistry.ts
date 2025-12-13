import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Engine/Abstract/Registries';
import type { TMousePositionWatcher, TMousePositionWatcherRegistry } from '@/Engine/Mouse/Models';

export const MousePositionWatcherRegistry = (): TMousePositionWatcherRegistry => AbstractEntityRegistry<TMousePositionWatcher>(RegistryType.MousePositionWatcher);
