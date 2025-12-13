import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';

import type { TKeyComboWatcher } from './TKeyComboWatcher';
import type { TKeyComboWatcherDependencies } from './TKeyComboWatcherDependencies';
import type { TKeyWatcher } from './TKeyWatcher';
import type { TKeyComboWatcherParams, TKeyWatcherParams } from './TKeyWatcherParams';

export type TKeyWatcherFactory = TReactiveFactory<TKeyWatcher | TKeyComboWatcher, TKeyWatcherParams | TKeyComboWatcherParams, TKeyComboWatcherDependencies | undefined>;
