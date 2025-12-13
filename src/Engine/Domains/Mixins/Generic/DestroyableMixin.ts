import type { IDestroyable, IReactiveDestroyable } from '@Engine/Domains/Mixins';
import { cleanObject, isDefined } from '@Engine/Utils';

export function destroyableMixin(obj: Record<string, any>, _destroy?: (...params: ReadonlyArray<any>) => void): IDestroyable | IReactiveDestroyable {
  const result = {
    isDestroyed: false,
    destroy: (...params: ReadonlyArray<any>): void => {
      if (isDefined(_destroy)) return _destroy(params);

      // TODO (S.Panfilov) check if it's needed
      // if (isReactiveDestroyable(obj)) {
      //   obj.destroyed$.next();
      //   obj.destroyed$.complete();
      // }
      // eslint-disable-next-line functional/immutable-data
      result.isDestroyed = true;
      return cleanObject(obj);
    }
  };

  return result;
}
