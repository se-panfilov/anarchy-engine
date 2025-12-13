import type { TAbstractWrapper } from '@Engine/Abstract';
import type { TSerializable } from '@Engine/Mixins';

export type TWrapper<T> = TAbstractWrapper<T> & TSerializable<any>;
