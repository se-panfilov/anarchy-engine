import type { TDestroyable, TNoSpread, TRegistrable, TWithEntity, TWithNameAndNameAccessorsMixin, TWithTags } from '@Anarchy/Engine/Mixins';

import type { TWithWrapperId } from './TWithWrapperId';

export type TAbstractWrapper<T> = TWithEntity<T> & TWithTags & TWithWrapperId & TDestroyable & TRegistrable & TWithNameAndNameAccessorsMixin & TNoSpread;
