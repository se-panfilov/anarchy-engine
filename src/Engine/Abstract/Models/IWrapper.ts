import type { IWithWrapperId } from '@/Engine/Abstract';
import type { IDestroyable, IRegistrable, IWithEntity, IWithNameAndNameAccessors, IWithTagsMixin } from '@/Engine/Mixins';

export type IWrapper<T> = IWithEntity<T> & IWithTagsMixin & IWithWrapperId & IDestroyable & IRegistrable & IWithNameAndNameAccessors;
