import type { IAbstractRegistry } from '@Engine/Domains/Abstract';
import type { IProtectedRegistry } from '@Engine/Domains/Mixins';

import type { IMousePositionWatcher } from './IMousePositionWatcher';

export type IMousePositionWatcherRegistry = IProtectedRegistry<IMousePositionWatcher, IAbstractRegistry<IMousePositionWatcher>>;
