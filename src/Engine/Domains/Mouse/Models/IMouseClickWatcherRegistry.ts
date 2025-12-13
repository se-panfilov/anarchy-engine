import type { IAbstractRegistry, IProtectedRegistry } from '@/Engine/Domains/Abstract';

import type { IMouseClickWatcher } from './IMouseClickWatcher';

export type IMouseClickWatcherRegistry = IProtectedRegistry<IMouseClickWatcher, IAbstractRegistry<IMouseClickWatcher>>;
