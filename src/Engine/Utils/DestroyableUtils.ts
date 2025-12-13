import type { IAbstractConfig, IGenericDestroyableFactory, IWrapper } from '@Engine/Models';

import { isEmptyObject } from './ObjectUtils';

export function isDestroyedFactory<T extends Record<string, unknown>, R extends IGenericDestroyableFactory<W, E, never, C>, W extends IWrapper<E>, E, C extends IAbstractConfig = void>(
  obj: T | R
): obj is R {
  return isEmptyObject(obj);
}
