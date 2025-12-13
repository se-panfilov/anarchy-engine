import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract/Models';

import type { IMouseClickWatcher } from './IMouseClickWatcher';

export type IMouseClickWatcherRegistry = IProtectedRegistry<IAbstractEntityRegistry<IMouseClickWatcher>>;
