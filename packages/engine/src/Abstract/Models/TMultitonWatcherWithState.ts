import type { TMultitonRegistrable } from '@Engine/Mixins';

import type { TAbstractProtectedWatcherWithState } from './TAbstractProtectedWatcherWithState';

export type TMultitonWatcherWithState<T> = TMultitonRegistrable & TAbstractProtectedWatcherWithState<T>;
