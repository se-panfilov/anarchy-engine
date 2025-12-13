import type { IGenericDestroyableFactory, IWrapper } from '@Engine/Domains/Abstract';

import { isEmptyObject } from './ObjectUtils';

export function isDestroyedFactory<T extends Record<string, unknown>, R extends IGenericDestroyableFactory<W, E, never, never>, W extends IWrapper<E>, E>(obj: T | R): obj is R {
  return isEmptyObject(obj);
}
