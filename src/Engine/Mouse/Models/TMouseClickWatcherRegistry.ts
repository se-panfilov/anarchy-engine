import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';

import type { TMouseClickWatcher } from './TMouseClickWatcher';

export type TMouseClickWatcherRegistry = TProtectedRegistry<TAbstractEntityRegistry<TMouseClickWatcher>>;
