import type { TDestroyable, TRegistrable, TWithId, TWithNameAndNameAccessorsMixin, TWithTags } from '@/Engine/Mixins';

export type TEntity<T extends Record<string, any>> = Readonly<T> & TWithTags & TDestroyable & TRegistrable & TWithNameAndNameAccessorsMixin & TWithId;
