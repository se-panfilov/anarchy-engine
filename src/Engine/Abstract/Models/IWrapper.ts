import type { IWithWrapperId, WrapperType } from '@/Engine/Abstract';
import type { IDestroyable, IRegistrable, IWithEntity, IWithNameAndNameAccessors, IWithTags } from '@/Engine/Mixins';

export type IWrapper<T> = IWithEntity<T> & IWithTags<WrapperType> & IWithWrapperId & IDestroyable & IRegistrable & IWithNameAndNameAccessors;
