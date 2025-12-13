import type { TAbstractWatcher } from '@/Abstract';
import type { TSerializable } from '@/Mixins';

export type TWatcher<T> = TAbstractWatcher<T> & TSerializable<any>;
