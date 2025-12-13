import type { TDestroyable, TRegistrable, TWithNameAndNameAccessorsMixin, TWithTagsMixin } from '@/Engine/Mixins';

export type TFacade<T extends Record<string, any>> = Readonly<T> & TWithTagsMixin & TDestroyable & TRegistrable & TWithNameAndNameAccessorsMixin;
