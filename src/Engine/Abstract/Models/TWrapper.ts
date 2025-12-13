import type { TWithWrapperId } from '@/Engine/Abstract';
import type { IWithEntity, IWithNameAndNameAccessorsMixin, TDestroyable, TRegistrable, TWithTagsMixin } from '@/Engine/Mixins';

export type TWrapper<T> = IWithEntity<T> & TWithTagsMixin & TWithWrapperId & TDestroyable & TRegistrable & IWithNameAndNameAccessorsMixin;
