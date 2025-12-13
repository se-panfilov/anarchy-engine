import type { TAbstractWatcherWithState } from '@Anarchy/Engine/Abstract';
import type { TGameKey } from '@Anarchy/Engine/Keyboard';

export type TKeyComboWatcher = TAbstractWatcherWithState<ReadonlySet<TGameKey>>;
