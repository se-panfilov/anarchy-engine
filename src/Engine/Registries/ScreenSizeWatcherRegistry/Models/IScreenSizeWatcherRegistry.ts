import type { IAbstractRegistry, IProtectedRegistry } from '@Engine/Models';
import type { IScreenSizeWatcher } from '@Engine/Watchers';

export type IScreenSizeWatcherRegistry = IProtectedRegistry<IScreenSizeWatcher, IAbstractRegistry<IScreenSizeWatcher>>;
