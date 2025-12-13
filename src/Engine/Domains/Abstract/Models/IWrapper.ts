import type { WrapperType } from '@/Engine/Domains/Abstract';
import type { IDestroyable, IRegistrable, IWithEntity, IWithTags } from '@/Engine/Mixins';

export type IWrapper<T> = IWithEntity<T> & IWithTags<WrapperType> & IDestroyable & IRegistrable;
