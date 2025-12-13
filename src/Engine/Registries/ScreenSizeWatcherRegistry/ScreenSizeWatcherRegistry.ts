import { AbstractRegistry } from '@Engine/Domains/Abstract';
import type { IScreenSizeWatcherRegistry } from '@Engine/Registries';
import { RegistryFacade, RegistryName } from '@Engine/Registries';
import type { IScreenSizeWatcher } from '@Engine/Watchers';

export const ScreenSizeWatcherRegistry = (): IScreenSizeWatcherRegistry => RegistryFacade(AbstractRegistry<IScreenSizeWatcher>(RegistryName.ScreenSizeWatcher));
