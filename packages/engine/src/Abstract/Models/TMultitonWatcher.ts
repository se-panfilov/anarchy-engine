import type { TMultitonRegistrable } from '@/Mixins';

import type { TAbstractWatcher } from './TAbstractWatcher';

export type TMultitonWatcher<T> = TMultitonRegistrable & TAbstractWatcher<T>;
