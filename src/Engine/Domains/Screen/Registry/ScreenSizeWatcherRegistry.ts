import { AbstractRegistry } from '@Engine/Domains/Abstract';
import { RegistryFacade } from '@Engine/Mixins';
import { RegistryName } from '@Engine/Registries';

import type { IScreenSizeWatcher, IScreenSizeWatcherRegistry } from '../Models';

export const ScreenSizeWatcherRegistry = (): IScreenSizeWatcherRegistry => RegistryFacade(AbstractRegistry<IScreenSizeWatcher>(RegistryName.ScreenSizeWatcher));
