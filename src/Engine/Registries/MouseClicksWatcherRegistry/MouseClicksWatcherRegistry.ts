import type { IMouseClicksWatcherRegistry } from '@Engine/Registries';
import { RegistryName, WatcherRegistry } from '@Engine/Registries';

import type { IMouseClicksWatcher } from '@/Engine/Watchers';

import { AbstractRegistry } from '../AbstractRegistry';

export const MouseClicksWatcherRegistry = (): IMouseClicksWatcherRegistry => WatcherRegistry(AbstractRegistry<IMouseClicksWatcher>(RegistryName.MouseClicksWatcher));
