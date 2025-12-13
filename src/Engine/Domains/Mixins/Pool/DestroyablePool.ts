import { AbstractPool } from '@Engine/Domains/Abstract';
import { cleanObject, isNotDefined } from '@Engine/Utils';

import type { IDestroyable } from '../Generic';
import type { IDestroyablePool } from './Models';

export function DestroyablePool<T extends Record<string, IDestroyable>>(pool: T): IDestroyablePool<T> {
  const destroyablePool: IDestroyablePool<T> = { ...AbstractPool<T>(pool), destroy };

  function destroy(): void {
    if (isNotDefined(destroyablePool.pool)) return;
    cleanObject(destroyablePool);
  }

  return destroyablePool;
}
