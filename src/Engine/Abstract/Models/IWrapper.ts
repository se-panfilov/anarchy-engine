import type { IWithWrapperId, WrapperType } from '@/Engine/Abstract';
import type { IDestroyable, IRegistrable, IWithEntity, IWithNameAndNameAccessors, IWithTagsMixin } from '@/Engine/Mixins';

export type IWrapper<T> = IWithEntity<T> & IWithTagsMixin<WrapperType> & IWithWrapperId & IDestroyable & IRegistrable & IWithNameAndNameAccessors;
