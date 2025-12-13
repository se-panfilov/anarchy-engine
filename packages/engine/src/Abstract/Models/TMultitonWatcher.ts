import type { TMultitonRegistrable } from '@Engine/Mixins';

import type { TAbstractWatcher } from './TAbstractWatcher';

export type TMultitonWatcher<T> = TMultitonRegistrable & TAbstractWatcher<T>;
