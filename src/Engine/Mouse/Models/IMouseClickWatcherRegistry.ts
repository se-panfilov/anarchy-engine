import type { IAbstractRegistry, IProtectedRegistry } from '@/Engine/Abstract';
import type { IMouseClickWatcher } from './IMouseClickWatcher';

export type IMouseClickWatcherRegistry = IProtectedRegistry<IAbstractRegistry<IMouseClickWatcher>>;
