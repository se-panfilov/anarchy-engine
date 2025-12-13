import type { IDestroyable } from '@Engine/Domains/Mixins';
import { cleanObject, isDefined, isReactiveFactory } from '@Engine/Utils';

export function destroyableMixin(factory: Record<string, any>, _destroy?: (...params: ReadonlyArray<any>) => void): IDestroyable {
  return {
    destroy: (...params: ReadonlyArray<any>): void => {
      if (isDefined(_destroy)) return _destroy(params);
      if (isReactiveFactory(factory)) {
        factory.destroyed$.next();
        factory.destroyed$.complete();
      }
      return cleanObject(factory);
    }
  };
}
