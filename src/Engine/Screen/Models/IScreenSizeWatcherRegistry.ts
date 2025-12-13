import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';

import type { TScreenSizeWatcher } from './TScreenSizeWatcher';

export type IScreenSizeWatcherRegistry = TProtectedRegistry<TAbstractEntityRegistry<TScreenSizeWatcher>>;
