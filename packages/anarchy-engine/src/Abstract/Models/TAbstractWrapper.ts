import type { TWithWrapperId } from '@Anarchy/Engine/Abstract';
import type { TDestroyable, TNoSpread, TRegistrable, TWithEntity, TWithNameAndNameAccessorsMixin, TWithTags } from '@Anarchy/Engine/Mixins';

export type TAbstractWrapper<T> = TWithEntity<T> & TWithTags & TWithWrapperId & TDestroyable & TRegistrable & TWithNameAndNameAccessorsMixin & TNoSpread;
