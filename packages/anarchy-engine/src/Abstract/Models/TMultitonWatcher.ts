import type { TMultitonRegistrable } from '@hellpig/anarchy-engine/Mixins';

import type { TAbstractWatcher } from './TAbstractWatcher';

export type TMultitonWatcher<T> = TMultitonRegistrable & TAbstractWatcher<T>;
