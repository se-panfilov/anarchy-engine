import type { TWithWrapperId } from '@/Engine/Abstract';
import type { TDestroyable, TRegistrable, IWithEntity, IWithNameAndNameAccessorsMixin, IWithTagsMixin } from '@/Engine/Mixins';

export type TWrapper<T> = IWithEntity<T> & IWithTagsMixin & TWithWrapperId & TDestroyable & TRegistrable & IWithNameAndNameAccessorsMixin;
