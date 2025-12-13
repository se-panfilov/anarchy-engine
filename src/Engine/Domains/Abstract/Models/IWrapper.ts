import type { IDestroyable, IRegistrable } from '@Engine/Mixins';

export type IWrapper<T> = Readonly<{
  entity: Readonly<T>;
}> &
  IDestroyable &
  IRegistrable;
