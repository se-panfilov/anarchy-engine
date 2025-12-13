import type { IDestroyable } from '@Engine/Models/IDestroyable';

export type IWrapper<T> = Readonly<{
  id: string;
  entity: Readonly<T>;
  tags: ReadonlyArray<string>;
}> &
  IDestroyable;
