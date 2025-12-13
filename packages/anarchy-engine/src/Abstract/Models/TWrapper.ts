import type { TAbstractWrapper } from '@Anarchy/Engine/Abstract';
import type { TSerializable } from '@Anarchy/Engine/Mixins';

export type TWrapper<T> = TAbstractWrapper<T> & TSerializable<any>;
