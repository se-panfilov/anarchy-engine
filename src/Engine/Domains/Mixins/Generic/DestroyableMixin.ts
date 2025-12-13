import type { IDestroyable, IReactiveDestroyable } from '@Engine/Domains/Mixins';
import { cleanObject, isDefined, isReactiveDestroyable } from '@Engine/Utils';

export function destroyableMixin(obj: Record<string, any>, _destroy?: (...params: ReadonlyArray<any>) => void): IDestroyable | IReactiveDestroyable {
  const result = {
    isDestroyed: false,
    destroy: (...params: ReadonlyArray<any>): void => {
      if (isDefined(_destroy)) return _destroy(params);
      if (isReactiveDestroyable(obj)) {
        obj.destroyed$.next();
        obj.destroyed$.complete();
      }
      // eslint-disable-next-line functional/immutable-data
      result.isDestroyed = true;
      return cleanObject(obj);
    }
  };

  return result;
}
