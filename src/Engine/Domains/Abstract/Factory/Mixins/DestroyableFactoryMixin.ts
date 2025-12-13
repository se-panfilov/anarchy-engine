import type { IDestroyable } from '@Engine/Domains/Mixins';
import { cleanObject, isDefined } from '@Engine/Utils';

import type { IFactory } from '../../Models';

export function destroyableFactoryMixin<F extends IFactory>(factory: F, _destroy?: (...params: ReadonlyArray<any>) => void): F & IDestroyable {
  function destroy(): void {
    cleanObject(factory);
  }

  return {
    ...factory,
    destroy: (...params: ReadonlyArray<any>): void => {
      if (isDefined(_destroy)) return _destroy(params);
      return destroy();
    }
  };
}
