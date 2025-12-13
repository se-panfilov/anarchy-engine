import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { IScreenSizeWatcherRegistry, TScreenSizeWatcher } from '@/Engine/Screen/Models';

export const ScreenSizeWatcherRegistry = (): IScreenSizeWatcherRegistry => RegistryFacade(AbstractEntityRegistry<TScreenSizeWatcher>(RegistryType.ScreenSizeWatcher));
