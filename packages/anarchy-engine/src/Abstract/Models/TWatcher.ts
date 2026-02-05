import type { TSerializable } from '@hellpig/anarchy-engine/Mixins';

import type { TAbstractWatcher } from './TAbstractWatcher';

export type TWatcher<T> = TAbstractWatcher<T> & TSerializable<any>;
