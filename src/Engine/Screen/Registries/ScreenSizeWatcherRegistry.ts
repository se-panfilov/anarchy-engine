import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractWatcherRegistry } from '@/Engine/Abstract/Registries';
import type { TScreenSizeWatcher, TScreenSizeWatcherRegistry } from '@/Engine/Screen/Models';

export const ScreenSizeWatcherRegistry = (): TScreenSizeWatcherRegistry => AbstractWatcherRegistry<TScreenSizeWatcher>(RegistryType.ScreenSizeWatcher);
