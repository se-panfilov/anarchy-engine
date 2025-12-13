import type { TAbstractWatcher } from '@Engine/Abstract';
import type { TSerializable } from '@Engine/Mixins';

export type TWatcher<T> = TAbstractWatcher<T> & TSerializable<any>;
