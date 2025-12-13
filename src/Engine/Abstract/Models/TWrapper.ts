import type { TWithWrapperId } from '@/Engine/Abstract';
import type { IWithEntity, IWithNameAndNameAccessorsMixin, TWithTagsMixin, TDestroyable, TRegistrable } from '@/Engine/Mixins';

export type TWrapper<T> = IWithEntity<T> & TWithTagsMixin & TWithWrapperId & TDestroyable & TRegistrable & IWithNameAndNameAccessorsMixin;
