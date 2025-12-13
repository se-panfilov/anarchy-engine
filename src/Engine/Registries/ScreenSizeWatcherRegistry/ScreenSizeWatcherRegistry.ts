import type { IScreenSizeWatcherRegistry } from '@Engine/Registries';
import { RegistryFacade, RegistryName } from '@Engine/Registries';

import type { IScreenSizeWatcher } from '@/Engine/Watchers';

import { AbstractRegistry } from '../AbstractRegistry';

export const ScreenSizeWatcherRegistry = (): IScreenSizeWatcherRegistry => RegistryFacade(AbstractRegistry<IScreenSizeWatcher>(RegistryName.ScreenSizeWatcher));
