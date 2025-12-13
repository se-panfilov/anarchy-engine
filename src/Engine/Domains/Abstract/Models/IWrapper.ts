import type { WrapperType } from '@/Engine/Domains/Abstract';
import type { IDestroyable, IRegistrable } from '@/Engine/Mixins';

export type IWrapper<T> = Readonly<{
  entity: Readonly<T>;
  type: WrapperType | string;
}> &
  IDestroyable &
  IRegistrable;
