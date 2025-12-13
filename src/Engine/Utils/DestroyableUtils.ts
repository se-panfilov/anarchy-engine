import type { IAbstractConfig, IDestroyableFactory, IWrapper } from '@Engine/Models';

import { isEmptyObject } from './ObjectUtils';

export function isDestroyedFactory<T extends Record<string, unknown>, R extends IDestroyableFactory<W, E, never, C>, W extends IWrapper<E>, E, C extends IAbstractConfig>(obj: T | R): obj is R {
  return isEmptyObject(obj);
}
