import type { TWithBaseAccessorsRegistry } from '@/Engine/Abstract/Models';
import type { TSerializable } from '@/Engine/Mixins';
import { asArray, findInMap, findKeyInMap, isDefined } from '@/Engine/Utils';

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
  const serialize = <S, D extends Record<string, any> | undefined>(dependencies?: Record<string, any> | undefined): ReadonlyArray<S> => {
    return map((value: T): S => {
      if (isDefined((value as TSerializable<S, D>).serialize)) return (value as TSerializable<S, D>).serialize(dependencies as D);
      if (isDefined((value as any).toString)) return (value as any).toString();

      console.warn(`[REGISTRY] Value "${value}" as no .serialize() or .toString() methods, returning as is`);
      return value as unknown as S;
    });
  };

  return {
    isEmpty,
    getLength,
    forEach,
    map,
    asArray: (): ReadonlyArray<T> => asArray(registry),
    getRegistryCopy,
    clear,
    find,
    findKey,
    serialize
  };
}
