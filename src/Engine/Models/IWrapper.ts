import type { IDestroyable } from '@Engine/Models/IDestroyable';
import type { IRegistrable } from '@Engine/Models/IRegistrable';

export type IWrapper<T> = Readonly<{
  entity: Readonly<T>;
}> &
  IDestroyable &
  IRegistrable;
