import type { TWithWrapperId } from '@/Engine/Abstract';
import type { TDestroyable, TRegistrable, TWithEntity, TWithNameAndNameAccessorsMixin, TWithReadonlyTags } from '@/Engine/Mixins';

export type TWrapper<T> = TWithEntity<T> & TWithReadonlyTags & TWithWrapperId & TDestroyable & TRegistrable & TWithNameAndNameAccessorsMixin;
