import type { TMultitonRegistrable } from '@/Mixins';

import type { TAbstractProtectedWatcherWithState } from './TAbstractProtectedWatcherWithState';

export type TMultitonWatcherWithState<T> = TMultitonRegistrable & TAbstractProtectedWatcherWithState<T>;
