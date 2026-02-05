import type { TDestroyable, TNoSpread, TRegistrable, TWithNameAndNameAccessorsMixin } from '@hellpig/anarchy-engine/Mixins';

export type TAbstractEntity<T extends Record<string, any>> = Readonly<T> & TDestroyable & TRegistrable & TWithNameAndNameAccessorsMixin & TNoSpread;
