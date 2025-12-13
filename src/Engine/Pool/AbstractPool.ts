import type { IAbstractPool } from './Models';

export function AbstractPool<T extends Record<string, unknown>>(init: () => T): IAbstractPool<T> {
  let pool: T | undefined = undefined;

  function setPool(obj: T): void {
    pool = obj;
  }

  return { init, pool, setPool };
}
