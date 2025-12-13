import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';

import type { IMouseClickWatcher } from './IMouseClickWatcher';

export type IMouseClickWatcherRegistry = TProtectedRegistry<TAbstractEntityRegistry<IMouseClickWatcher>>;
