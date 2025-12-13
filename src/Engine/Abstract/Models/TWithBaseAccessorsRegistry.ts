export type TWithBaseAccessorsRegistry<T> = {
  find: (predicate: (entity: T, key: string) => boolean) => T | undefined;
  get: (predicate: (entity: T, key: string) => boolean) => T | never;
  findKey: (predicate: (entity: T, key: string) => boolean) => string | undefined;
  getKey: (predicate: (entity: T, key: string) => boolean) => string | never;
  forEach: (callback: (value: T, key: string, map: Map<string, T>) => void) => void;
  map: <U>(cb: (value: T, key?: string) => U) => ReadonlyArray<U>;
  asArray: () => ReadonlyArray<T>;
  getRegistryCopy: () => Map<string, T>;
  getLength: () => number;
  isEmpty: () => boolean;
  clear: () => void;
  serialize: <S>(dependencies?: Record<string, any> | undefined) => ReadonlyArray<S>;
};
