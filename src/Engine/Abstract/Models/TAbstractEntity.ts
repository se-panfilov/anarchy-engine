import type { TDestroyable, TNoSpread, TRegistrable, TWithId, TWithNameAndNameAccessorsMixin, TWithTags } from '@/Engine/Mixins';

export type TAbstractEntity<T extends Record<string, any>> = Readonly<T> & TWithTags & TDestroyable & TRegistrable & TWithNameAndNameAccessorsMixin & TWithId & TNoSpread;
