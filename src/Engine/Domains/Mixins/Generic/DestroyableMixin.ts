import type { IDestroyable } from '@Engine/Domains/Mixins';
import { cleanObject, isDefined } from '@Engine/Utils';

export function destroyableMixin(factory: Record<string, any>, _destroy?: (...params: ReadonlyArray<any>) => void): IDestroyable {
  return {
    destroy: (...params: ReadonlyArray<any>): void => {
      if (isDefined(_destroy)) return _destroy(params);
      return cleanObject(factory);
    }
  };
}
