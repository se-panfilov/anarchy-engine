import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { IScreenSizeWatcher, IScreenSizeWatcherRegistry } from '@/Engine/Screen/Models';

export const ScreenSizeWatcherRegistry = (): IScreenSizeWatcherRegistry => RegistryFacade(AbstractEntityRegistry<IScreenSizeWatcher>(RegistryType.ScreenSizeWatcher));
