export type TWithBaseAccessorsRegistry<T> = {
  find: (predicate: (entity: T, key: string) => boolean) => T | undefined;
  forEach: (callback: (entity: T) => void) => void;
  getAll: () => ReadonlyArray<T>;
  getLength: () => number;
  isEmpty: () => boolean;
};
