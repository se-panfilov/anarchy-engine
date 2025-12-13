import type { IWrapper } from '@Engine/Domains/Abstract';

import type { IMousePositionAccessors } from './IMousePositionAccessors';
import type { IMousePositionWatcher } from './IMousePositionWatcher';

export type IMousePositionWatcherWrapper = IWrapper<IMousePositionWatcher> & IMousePositionAccessors;
