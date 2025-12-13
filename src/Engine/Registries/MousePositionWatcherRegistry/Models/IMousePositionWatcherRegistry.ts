import type { IAbstractRegistry } from '@Engine/Domains/Abstract';
import type { IProtectedRegistry } from '@Engine/Models';
import type { IMousePositionWatcher } from '@Engine/Watchers';

export type IMousePositionWatcherRegistry = IProtectedRegistry<IMousePositionWatcher, IAbstractRegistry<IMousePositionWatcher>>;
