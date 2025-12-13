import type { IAbstractRegistry, IProtectedRegistry } from '@Engine/Domains/Abstract';

import type { IScreenSizeWatcher } from './IScreenSizeWatcher';

export type IScreenSizeWatcherRegistry = IProtectedRegistry<IScreenSizeWatcher, IAbstractRegistry<IScreenSizeWatcher>>;
