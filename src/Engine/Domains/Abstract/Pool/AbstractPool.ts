import type { IAbstractPool } from '../Models';

export function AbstractPool<T extends Record<string, unknown>>(pool: T): IAbstractPool<T> {
  return { pool };
}
