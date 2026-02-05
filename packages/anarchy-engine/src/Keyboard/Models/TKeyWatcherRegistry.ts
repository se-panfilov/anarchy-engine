import type { TAbstractEntityRegistry } from '@hellpig/anarchy-engine/Abstract/Models';

import type { TKeyComboWatcher } from './TKeyComboWatcher';
import type { TKeyWatcher } from './TKeyWatcher';

export type TKeyWatcherRegistry = TAbstractEntityRegistry<TKeyWatcher | TKeyComboWatcher>;
