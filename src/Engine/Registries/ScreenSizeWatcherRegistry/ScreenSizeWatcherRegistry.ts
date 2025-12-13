import { AbstractRegistry } from '@Engine/Domains/Abstract';
import { RegistryFacade } from '@Engine/Mixins';
import type { IScreenSizeWatcherRegistry } from '@Engine/Registries';
import { RegistryName } from '@Engine/Registries';
import type { IScreenSizeWatcher } from '@Engine/Watchers';

export const ScreenSizeWatcherRegistry = (): IScreenSizeWatcherRegistry => RegistryFacade(AbstractRegistry<IScreenSizeWatcher>(RegistryName.ScreenSizeWatcher));
