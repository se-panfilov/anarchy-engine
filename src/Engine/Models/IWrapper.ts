import type { IDestroyable, IRegistrable } from '@Engine/Models';

export type IWrapper<T> = Readonly<{
  entity: Readonly<T>;
}> &
  IDestroyable &
  IRegistrable;
