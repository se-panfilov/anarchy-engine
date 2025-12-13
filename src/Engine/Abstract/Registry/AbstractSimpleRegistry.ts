import { nanoid } from 'nanoid';
import { Subject } from 'rxjs';

import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { IAbstractSimpleRegistry } from '@/Engine/Abstract/Models';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { findInMap, getAll, isDestroyable, isNotDefined } from '@/Engine/Utils';

export function AbstractSimpleRegistry<T>(type: RegistryType): IAbstractSimpleRegistry<T> {
  const id: string = type + '_registry_' + nanoid();
  const registry: Map<string, T> = new Map();
  const added$: Subject<T> = new Subject<T>();
  const replaced$: Subject<T> = new Subject<T>();
  const removed$: Subject<T> = new Subject<T>();

  function add(key: string, value: T): void | never {
    if (registry.has(key)) throw new Error(`Cannot add to a registry("${id}") a value with key "${key}": The key is already exist in the registry`);
    registry.set(key, value);
    added$.next(value);
  }

  function replace(key: string, value: T): void | never {
    if (registry.has(key)) throw new Error(`Cannot replace in a registry("${id}") a value with key "${key}": The key is not exist in the registry`);
    registry.set(key, value);
    replaced$.next(value);
  }

  const getByKey = (key: string): T | undefined => registry.get(key);

  function remove(key: string): void | never {
    const value: T | undefined = registry.get(key);
    if (isNotDefined(value)) throw new Error(`Cannot remove in a registry("${id}") a value with key "${key}": The key is not exist in the registry`);
    registry.delete(key);
    removed$.next(value);
  }

  const destroyable: IDestroyable = destroyableMixin();

  destroyable.destroyed$.subscribe((): void => {
    added$.complete();
    replaced$.complete();
    removed$.complete();
    registry.forEach((obj: T): void => {
      if (isDestroyable(obj)) obj.destroy();
    });
    registry.clear();
  });

  const isEmpty = (): boolean => registry.size === 0;

  const getLength = (): number => registry.size;
  const forEach = (callback: (value: T) => void): void => registry.forEach(callback);
  const find = (callback: (value: T) => boolean): T | undefined => findInMap(registry, callback);

  return {
    id,
    type,
    added$: added$.asObservable(),
    replaced$: replaced$.asObservable(),
    removed$: removed$.asObservable(),
    add,
    replace,
    getByKey,
    getAll: () => getAll(registry),
    isEmpty,
    registry,
    remove,
    getLength,
    forEach,
    find,
    ...destroyable
  };
}
