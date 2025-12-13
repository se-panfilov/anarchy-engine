import type { IWithBaseAccessorsRegistry } from '@/Engine/Abstract/Models';
import { findInMap, getAll } from '@/Engine/Utils';

export function withBaseAccessorsRegistry<T>(registry: Map<string, T>): IWithBaseAccessorsRegistry<T> {
  const isEmpty = (): boolean => registry.size === 0;
  const getLength = (): number => registry.size;
  const forEach = (callback: (entity: T) => void): void => registry.forEach(callback);
  const find = (callback: (entity: T) => boolean): T | undefined => findInMap(registry, callback);

  return {
    isEmpty,
    getLength,
    forEach,
    getAll: () => getAll(registry),
    find
  };
}
