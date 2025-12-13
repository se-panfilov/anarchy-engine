import type { IAbstractRegistry, IProtectedRegistry } from '@Engine/Domains/Abstract';

import type { IMouseClicksWatcher } from './IMouseClicksWatcher';

export type IMouseClicksWatcherRegistry = IProtectedRegistry<IMouseClicksWatcher, IAbstractRegistry<IMouseClicksWatcher>>;
