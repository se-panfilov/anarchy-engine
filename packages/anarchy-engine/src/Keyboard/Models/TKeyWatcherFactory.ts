import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';

import type { TKeyWatcher } from './TKeyWatcher';
import type { TKeyWatcherParams } from './TKeyWatcherParams';

export type TKeyWatcherFactory = TReactiveFactory<TKeyWatcher, TKeyWatcherParams>;
