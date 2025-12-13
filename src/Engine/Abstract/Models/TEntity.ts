import type { TDestroyable, TRegistrable, TWithId, TWithNameAndNameAccessorsMixin, TWithTagsMixin } from '@/Engine/Mixins';

export type TEntity<T extends Record<string, any>> = Readonly<T> & TWithTagsMixin & TDestroyable & TRegistrable & TWithNameAndNameAccessorsMixin & TWithId;
