import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractWatcherRegistry } from '@/Engine/Abstract/Registries';
import type { TMousePositionWatcher, TMousePositionWatcherRegistry } from '@/Engine/Mouse/Models';

export const MousePositionWatcherRegistry = (): TMousePositionWatcherRegistry => AbstractWatcherRegistry<TMousePositionWatcher>(RegistryType.MousePositionWatcher);
