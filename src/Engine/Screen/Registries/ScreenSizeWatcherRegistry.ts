import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { TScreenSizeWatcher, TScreenSizeWatcherRegistry } from '@/Engine/Screen/Models';

export const ScreenSizeWatcherRegistry = (): TScreenSizeWatcherRegistry => RegistryFacade(AbstractEntityRegistry<TScreenSizeWatcher>(RegistryType.ScreenSizeWatcher));
