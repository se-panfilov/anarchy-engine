import type { IDestroyable } from '@Engine/Domains/Mixins';
import { cleanObject, isDefined } from '@Engine/Utils';

import type { IFactory } from '@/Engine/Domains/Abstract';

export function destroyableFactoryMixin(factory: IFactory, _destroy?: (...params: ReadonlyArray<any>) => void): IDestroyable {
  return {
    destroy: (...params: ReadonlyArray<any>): void => {
      if (isDefined(_destroy)) return _destroy(params);
      return cleanObject(factory);
    }
  };
}
