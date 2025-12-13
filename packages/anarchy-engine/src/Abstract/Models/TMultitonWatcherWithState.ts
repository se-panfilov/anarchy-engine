import type { TMultitonRegistrable } from '@Anarchy/Engine/Mixins';

import type { TAbstractProtectedWatcherWithState } from './TAbstractProtectedWatcherWithState';

export type TMultitonWatcherWithState<T> = TMultitonRegistrable & TAbstractProtectedWatcherWithState<T>;
