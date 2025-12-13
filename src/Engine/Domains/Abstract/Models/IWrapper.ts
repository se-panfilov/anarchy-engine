import type { IDestroyable, IRegistrable } from '@Engine/Domains/Mixins';
import type { WrapperType } from '@/Engine/Domains/Abstract';

export type IWrapper<T> = Readonly<{
  entity: Readonly<T>;
  type: WrapperType | string;
}> &
  IDestroyable &
  IRegistrable;
