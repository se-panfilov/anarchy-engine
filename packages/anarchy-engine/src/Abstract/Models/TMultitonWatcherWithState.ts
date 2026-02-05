import type { TMultitonRegistrable } from '@hellpig/anarchy-engine/Mixins';

import type { TAbstractProtectedWatcherWithState } from './TAbstractProtectedWatcherWithState';

export type TMultitonWatcherWithState<T> = TMultitonRegistrable & TAbstractProtectedWatcherWithState<T>;
