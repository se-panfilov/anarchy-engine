import type { IAbstractRegistry } from '@/Engine/Domains/Abstract';
import type { IProtectedRegistry } from '@/Engine/Mixins';

import type { IMouseClickWatcher } from './IMouseClickWatcher';

export type IMouseClickWatcherRegistry = IProtectedRegistry<IMouseClickWatcher, IAbstractRegistry<IMouseClickWatcher>>;
