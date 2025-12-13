import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { IScreenSizeWatcher, IScreenSizeWatcherRegistry } from '@/Engine/Screen/Models';

export const ScreenSizeWatcherRegistry = (): IScreenSizeWatcherRegistry => RegistryFacade(AbstractEntityRegistry<IScreenSizeWatcher>(RegistryType.ScreenSizeWatcher));
