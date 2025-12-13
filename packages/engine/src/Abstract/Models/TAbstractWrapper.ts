import type { TWithWrapperId } from '@/Abstract';
import type { TDestroyable, TNoSpread, TRegistrable, TWithEntity, TWithNameAndNameAccessorsMixin, TWithTags } from '@/Mixins';

export type TAbstractWrapper<T> = TWithEntity<T> & TWithTags & TWithWrapperId & TDestroyable & TRegistrable & TWithNameAndNameAccessorsMixin & TNoSpread;
