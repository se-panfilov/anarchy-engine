import type { IAbstractRegistry } from '@Engine/Domains/Abstract';
import type { IProtectedRegistry } from '@Engine/Models';

import type { ICameraWrapper } from '@/Engine/Domains/Camera';
import type { IMousePositionWatcher } from '@/Engine/Watchers';

export type IMousePositionWatcherRegistry = IProtectedRegistry<IMousePositionWatcher, IAbstractRegistry<ICameraWrapper>>;
