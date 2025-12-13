import type { IAbstractRegistry, IProtectedRegistry } from '@/Engine/Domains/Abstract';

import type { IMousePositionWatcher } from './IMousePositionWatcher';

export type IMousePositionWatcherRegistry = IProtectedRegistry<IMousePositionWatcher, IAbstractRegistry<IMousePositionWatcher>>;
