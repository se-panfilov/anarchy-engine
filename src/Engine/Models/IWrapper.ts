import type { IDestroyable } from '@Engine/Models/IDestroyable';

import type { IRegistrableEntity } from '@/Engine/Models/IRegistrableEntity';

export type IWrapper<T> = Readonly<{
  entity: Readonly<T>;
}> & IDestroyable & IRegistrableEntity;
