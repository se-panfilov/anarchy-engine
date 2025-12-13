import type { IWithBaseAccessorsRegistry } from '@/Engine/Abstract/Models';
import { findInMap, getAll } from '@/Engine/Utils';

export function withBaseAccessorsRegistry<T>(registry: Map<string, T>): IWithBaseAccessorsRegistry<T> {
  const isEmpty = (): boolean => registry.size === 0;
  const getLength = (): number => registry.size;
  const forEach = (predicate: (entity: T) => void): void => registry.forEach(predicate);
  const find = (predicate: (entity: T, key: string) => boolean): T | undefined => findInMap(registry, predicate);

  return {
    isEmpty,
    getLength,
    forEach,
    getAll: () => getAll(registry),
    find
  };
}
