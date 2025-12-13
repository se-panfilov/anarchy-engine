import type { IDestroyable } from '@Engine/Models';
import { AbstractPool } from '@Engine/Pool/AbstractPool';
import { isNotDefined } from '@Engine/Utils';

import type { IAbstractPool, IDestroyablePool } from './Models';

export function DestroyablePool<T extends Record<string, IDestroyable>>(pool: T): IDestroyablePool<T> {
  const abstractPool: IAbstractPool<T> = AbstractPool<T>(pool);

  // TODO (S.Panfilov) fix destroy
  function destroy(): void {
    if (isNotDefined(abstractPool.pool)) return;
    Object.entries(abstractPool.pool).forEach(([k, v]): void => {
      if (v.destroy) v.destroy();
      // pool[k] = null;
      // delete pool[k];
    });
  }

  return { ...abstractPool, destroy };
}
