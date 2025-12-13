import type { IAbstractRegistry } from '@Engine/Domains/Abstract';
import type { IProtectedRegistry } from '@Engine/Mixins';
import type { IScreenSizeWatcher } from './IScreenSizeWatcher';

export type IScreenSizeWatcherRegistry = IProtectedRegistry<IScreenSizeWatcher, IAbstractRegistry<IScreenSizeWatcher>>;
