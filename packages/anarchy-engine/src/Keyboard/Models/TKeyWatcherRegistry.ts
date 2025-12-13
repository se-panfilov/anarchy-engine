import type { TAbstractEntityRegistry } from '@Anarchy/Engine/Abstract/Models';
import type { TKeyComboWatcher } from '@Anarchy/Engine/Keyboard';

import type { TKeyWatcher } from './TKeyWatcher';

export type TKeyWatcherRegistry = TAbstractEntityRegistry<TKeyWatcher | TKeyComboWatcher>;
