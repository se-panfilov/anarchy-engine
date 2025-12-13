import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Engine/Abstract/Registries';
import type { TScreenSizeWatcher, TScreenSizeWatcherRegistry } from '@/Engine/Screen/Models';

export const ScreenSizeWatcherRegistry = (): TScreenSizeWatcherRegistry => AbstractEntityRegistry<TScreenSizeWatcher>(RegistryType.ScreenSizeWatcher);
