import type { IDestroyable, IRegistrable } from '../Registry/Mixin';

export type IWrapper<T> = Readonly<{
  entity: Readonly<T>;
}> &
  IDestroyable &
  IRegistrable;
