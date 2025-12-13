import type { IAbstractRegistry, IProtectedRegistry } from '@Engine/Models';

import type { IMouseClicksWatcher } from '@/Engine/Watchers';

export type IMouseClicksWatcherRegistry = IProtectedRegistry<IMouseClicksWatcher, IAbstractRegistry<IMouseClicksWatcher>>;
