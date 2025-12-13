export type TWithBaseAccessorsRegistry<T> = {
  isEmpty: () => boolean;
  getLength: () => number;
  forEach: (callback: (entity: T) => void) => void;
  find: (predicate: (entity: T, key: string) => boolean) => T | undefined;
  getAll: () => ReadonlyArray<T>;
};
