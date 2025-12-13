import type { IDestroyable } from '@Engine/Domains/Abstract/Registry/Mixin';
import { cleanObject, isNotDefined } from '@Engine/Utils';

import type { IDestroyablePool } from '../../Models';
import { AbstractPool } from '../../Pool';

export function DestroyablePool<T extends Record<string, IDestroyable>>(pool: T): IDestroyablePool<T> {
  const destroyablePool: IDestroyablePool<T> = { ...AbstractPool<T>(pool), destroy };

  function destroy(): void {
    if (isNotDefined(destroyablePool.pool)) return;
    cleanObject(destroyablePool);
  }

  return destroyablePool;
}
