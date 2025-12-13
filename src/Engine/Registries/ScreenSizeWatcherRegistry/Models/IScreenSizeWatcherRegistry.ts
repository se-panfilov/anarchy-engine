import type { IAbstractRegistry } from '@Engine/Domains/Abstract';
import type { IProtectedRegistry } from '@Engine/Mixins';
import type { IScreenSizeWatcher } from '@Engine/Watchers';

export type IScreenSizeWatcherRegistry = IProtectedRegistry<IScreenSizeWatcher, IAbstractRegistry<IScreenSizeWatcher>>;
