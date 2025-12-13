import { AbstractRegistry, RegistryFacade } from '@/Engine/Domains/Abstract';
import type { IScreenSizeWatcher, IScreenSizeWatcherRegistry } from '@/Engine/Domains/Screen/Models';
import { RegistryType } from '@/Engine/Registries';

export const ScreenSizeWatcherRegistry = (): IScreenSizeWatcherRegistry => RegistryFacade(AbstractRegistry<IScreenSizeWatcher>(RegistryType.ScreenSizeWatcher));
