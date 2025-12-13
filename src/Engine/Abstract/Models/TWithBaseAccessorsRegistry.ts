export type TWithBaseAccessorsRegistry<T> = {
  find: (predicate: (entity: T, key: string) => boolean) => T | undefined;
  findKey: (predicate: (entity: T, key: string) => boolean) => string | undefined;
  forEach: (callback: (value: T, key: string, map: Map<string, T>) => void) => void;
  asArray: () => ReadonlyArray<T>;
  getRegistryCopy: () => Map<string, T>;
  getLength: () => number;
  isEmpty: () => boolean;
  clear: () => void;
  serialize: (dependencies?: Record<string, any>) => unknown;
};
