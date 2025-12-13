import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract/Models';

import type { IScreenSizeWatcher } from './IScreenSizeWatcher';

export type IScreenSizeWatcherRegistry = IProtectedRegistry<IAbstractEntityRegistry<IScreenSizeWatcher>>;
