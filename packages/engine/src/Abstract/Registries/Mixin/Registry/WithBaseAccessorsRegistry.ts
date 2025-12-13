import type { TWithBaseAccessorsRegistry } from '@/Abstract/Models';
import type { TSerializable } from '@/Mixins';
import { asArray, findInMap, findKeyInMap, isDefined, isNotDefined } from '@/Utils';

export function withBaseAccessorsRegistry<T>(registry: Map<string, T>): TWithBaseAccessorsRegistry<T> {
  const isEmpty = (): boolean => registry.size === 0;
  const getLength = (): number => registry.size;
  const forEach = (cb: (value: T, key: string, map: Map<string, T>) => void): void => registry.forEach(cb);
  const map = <U>(cb: (value: T, key?: string) => U): ReadonlyArray<U> => {
    return Array.from(registry, ([key, value]: [string, T]): U => cb(value, key));
  };
  const find = (predicate: (entity: T, key: string) => boolean): T | undefined => findInMap(registry, predicate);
  const findKey = (predicate: (entity: T, key: string) => boolean): string | undefined => findKeyInMap(registry, predicate);
  const clear = (): void => registry.clear();
  const getRegistryCopy = (): Map<string, T> => new Map(registry);
  const serialize = <S, D extends Record<string, any> | undefined>(dependencies?: Record<string, any> | undefined): ReadonlyArray<S> | never => {
    return map((value: T): S => {
      if (isDefined((value as TSerializable<S, D>).serialize)) return (value as TSerializable<S, D>).serialize(dependencies as D);
      if (isDefined((value as any).toString)) {
        const result = (value as any).toString().trim();
        if (result === {}.toString()) {
          throw new Error(
            `[REGISTRY]: Value "${value}" has no .serialize() or .toString() methods. Standard .toString() returned '[object Object]' which seems to be an error. Details: id: "${(value as any).id}", name: "${(value as any).name}"`
          );
        }
        if (result === [].toString() || result === '') {
          throw new Error(
            `[REGISTRY]: Value "${value}" has no .serialize() or .toString() methods. Standard .toString() returned an empty string which seems to be an error. Details: id: "${(value as any).id}", name: "${(value as any).name}"`
          );
        }

        return result as unknown as S;
      }

      console.warn(`[REGISTRY] Value "${value}" as no .serialize() or .toString() methods, returning as is`);
      return value as unknown as S;
    });
  };

  return {
    asArray: (): ReadonlyArray<T> => asArray(registry),
    clear,
    find,
    findKey,
    getKey: (predicate: (entity: T, key: string) => boolean): string | never => {
      const result: string | undefined = findKey(predicate);
      if (isNotDefined(result)) throw new Error('[REGISTRY]: Cannot find an entity key with the provided predicate');
      return result;
    },
    forEach,
    getLength,
    getRegistryCopy,
    isEmpty,
    get: (predicate: (value: T, key: string) => boolean): T | never => {
      const result: T | undefined = find(predicate);
      if (isNotDefined(result)) throw new Error('[REGISTRY]: Cannot find an entity with the provided predicate');
      return result;
    },
    map,
    serialize
  };
}
