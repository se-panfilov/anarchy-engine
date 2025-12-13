import type { IAbstractRegistry, IProtectedRegistry } from '@Engine/Models';

import type { IMousePositionWatcher } from '@/Engine/Watchers';

export type IMousePositionWatcherRegistry = IProtectedRegistry<IMousePositionWatcher, IAbstractRegistry<ICameraWrapper>>;
