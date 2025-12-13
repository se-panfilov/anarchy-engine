import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract';

import type { IScreenSizeWatcher } from './IScreenSizeWatcher';

export type IScreenSizeWatcherRegistry = IProtectedRegistry<IAbstractEntityRegistry<IScreenSizeWatcher>>;
