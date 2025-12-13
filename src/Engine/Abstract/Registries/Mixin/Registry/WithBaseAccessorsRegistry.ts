import type { TWithBaseAccessorsRegistry } from '@/Engine/Abstract/Models';
import { asArray, findInMap, findKeyInMap } from '@/Engine/Utils';

export function withBaseAccessorsRegistry<T>(registry: Map<string, T>): TWithBaseAccessorsRegistry<T> {
  const isEmpty = (): boolean => registry.size === 0;
  const getLength = (): number => registry.size;
  const forEach = (predicate: (entity: T) => void): void => registry.forEach(predicate);
  const find = (predicate: (entity: T, key: string) => boolean): T | undefined => findInMap(registry, predicate);
  const findKey = (predicate: (entity: T, key: string) => boolean): string | undefined => findKeyInMap(registry, predicate);
  const clear = (): void => registry.clear();
  const getRegistryCopy = (): Map<string, T> => new Map(registry);

  return {
    isEmpty,
    getLength,
    forEach,
    asArray: (): ReadonlyArray<T> => asArray(registry),
    getRegistryCopy,
    clear,
    find,
    findKey
  };
}
