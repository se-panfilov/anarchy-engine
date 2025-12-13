import type { WrapperType } from '@/Engine/Domains/Abstract';
import type { IDestroyable, IRegistrable, IWithTags } from '@/Engine/Mixins';

export type IWrapper<T> = Readonly<{
  entity: Readonly<T>;
}> &
  IWithTags<WrapperType> &
  IDestroyable &
  IRegistrable;
