import type { IAbstractRegistry } from '@Engine/Domains/Abstract';
import type { IProtectedRegistry } from '@Engine/Mixins';
import type { IMousePositionWatcher } from '@Engine/Watchers';

export type IMousePositionWatcherRegistry = IProtectedRegistry<IMousePositionWatcher, IAbstractRegistry<IMousePositionWatcher>>;
