import type { TWithWrapperId } from '@/Engine/Abstract';
import type { TDestroyable, TRegistrable, TWithEntity, TWithNameAndNameAccessorsMixin, TWithTagsMixin } from '@/Engine/Mixins';

export type TWrapper<T> = TWithEntity<T> & TWithTagsMixin & TWithWrapperId & TDestroyable & TRegistrable & TWithNameAndNameAccessorsMixin;
