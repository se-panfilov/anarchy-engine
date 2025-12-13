import { AbstractRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { IScreenSizeWatcher, IScreenSizeWatcherRegistry } from '@/Engine/Screen/Models';

export const ScreenSizeWatcherRegistry = (): IScreenSizeWatcherRegistry => RegistryFacade(AbstractRegistry<IScreenSizeWatcher>(RegistryType.ScreenSizeWatcher));
