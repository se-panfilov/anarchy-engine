import type { TWithWrapperId } from '@/Engine/Abstract';
import type { IWithNameAndNameAccessorsMixin, TDestroyable, TRegistrable, TWithEntity, TWithTagsMixin } from '@/Engine/Mixins';

export type TWrapper<T> = TWithEntity<T> & TWithTagsMixin & TWithWrapperId & TDestroyable & TRegistrable & IWithNameAndNameAccessorsMixin;
