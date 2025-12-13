import type { IAbstractRegistry, IProtectedRegistry } from '@/Engine/Abstract';

import type { IScreenSizeWatcher } from './IScreenSizeWatcher';

export type IScreenSizeWatcherRegistry = IProtectedRegistry<IAbstractRegistry<IScreenSizeWatcher>>;
