import type { TAbstractRegistryPack } from '@/Engine/Abstract';

export type TWithBaseAccessorsRegistry<T> = {
  find: (predicate: (entity: TAbstractRegistryPack<T>, key: string) => boolean) => T | undefined;
  forEach: (callback: (entity: T) => void) => void;
  getAll: () => ReadonlyArray<T>;
  getRegistryCopy: () => Map<string, T>;
  getLength: () => number;
  isEmpty: () => boolean;
};
