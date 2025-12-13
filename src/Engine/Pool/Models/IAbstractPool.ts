export type IAbstractPool<T> = Readonly<{
  init: () => T;
  pool: T | undefined;
  setPool: (obj: T) => void;
}>;
