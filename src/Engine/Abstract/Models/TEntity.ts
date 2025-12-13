import type { TDestroyable, TRegistrable, TWithId, TWithNameAndNameAccessorsMixin, TWithReadonlyTags } from '@/Engine/Mixins';

export type TEntity<T extends Record<string, any>> = Readonly<T> & TWithReadonlyTags & TDestroyable & TRegistrable & TWithNameAndNameAccessorsMixin & TWithId;
