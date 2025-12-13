import type { TAbstractWrapper } from '@/Abstract';
import type { TSerializable } from '@/Mixins';

export type TWrapper<T> = TAbstractWrapper<T> & TSerializable<any>;
