import { isEmptyObject } from './ObjectUtils';

export function isDestroyedFactory<T extends Record<string, unknown>>(obj: T): boolean {
  return isEmptyObject(obj);
}
