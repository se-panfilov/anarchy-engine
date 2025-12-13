import type { TWithWrapperId } from '@Engine/Abstract';
import type { TDestroyable, TNoSpread, TRegistrable, TWithEntity, TWithNameAndNameAccessorsMixin, TWithTags } from '@Engine/Mixins';

export type TAbstractWrapper<T> = TWithEntity<T> & TWithTags & TWithWrapperId & TDestroyable & TRegistrable & TWithNameAndNameAccessorsMixin & TNoSpread;
