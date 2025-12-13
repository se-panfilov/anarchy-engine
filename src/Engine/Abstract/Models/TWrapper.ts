import type { TWithWrapperId } from '@/Engine/Abstract';
import type { IWithEntity, IWithNameAndNameAccessorsMixin, IWithTagsMixin, TDestroyable, TRegistrable } from '@/Engine/Mixins';

export type TWrapper<T> = IWithEntity<T> & IWithTagsMixin & TWithWrapperId & TDestroyable & TRegistrable & IWithNameAndNameAccessorsMixin;
