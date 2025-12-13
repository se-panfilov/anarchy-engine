import type { IAbstractRegistry } from '@Engine/Domains/Abstract';
import type { IProtectedRegistry } from '@Engine/Domains/Mixins';

import type { IMouseClicksWatcher } from './IMouseClicksWatcher';

export type IMouseClicksWatcherRegistry = IProtectedRegistry<IMouseClicksWatcher, IAbstractRegistry<IMouseClicksWatcher>>;
