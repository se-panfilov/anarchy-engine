import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';

import type { TScreenSizeWatcher } from './TScreenSizeWatcher';

export type TScreenSizeWatcherRegistry = TProtectedRegistry<TAbstractEntityRegistry<TScreenSizeWatcher>>;
