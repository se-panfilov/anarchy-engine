import type { IDestroyable, IRegistrable } from '@Engine/Domains/Mixins';

export type IWrapper<T> = Readonly<{
  entity: Readonly<T>;
}> &
  IDestroyable &
  IRegistrable;
