export type IWithBaseAccessorsRegistry<T> = {
  isEmpty: () => boolean;
  getLength: () => number;
  forEach: (callback: (entity: T) => void) => void;
  find: (callback: (entity: T) => boolean) => T | undefined;
  getAll: () => ReadonlyArray<T>;
};
