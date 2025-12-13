import type { TSerializable } from '@Anarchy/Engine/Mixins';

import type { TAbstractWatcher } from './TAbstractWatcher';

export type TWatcher<T> = TAbstractWatcher<T> & TSerializable<any>;
