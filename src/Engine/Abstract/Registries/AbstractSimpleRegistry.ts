import { nanoid } from 'nanoid';

import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { IAbstractSimpleRegistry, IWithBaseAccessorsRegistry, IWithReactiveRegistry } from '@/Engine/Abstract/Models';
import { withBaseAccessorsRegistry } from '@/Engine/Abstract/Registries/Mixin';
import { withReactiveRegistry } from '@/Engine/Abstract/Registries/Mixin/Registry/WithReactiveRegistry';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { isNotDefined } from '@/Engine/Utils';

export function AbstractSimpleRegistry<T>(type: RegistryType): IAbstractSimpleRegistry<T> {
  const id: string = type + '_registry_' + nanoid();
  const registry: Map<string, T> = new Map();

  const destroyable: IDestroyable = destroyableMixin();
  const { added$, replaced$, removed$ }: IWithReactiveRegistry<T> = withReactiveRegistry<T>(destroyable);
  const { isEmpty, getLength, forEach, getAll, find }: IWithBaseAccessorsRegistry<T> = withBaseAccessorsRegistry<T>(registry);

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

  return {
    id,
    type,
    added$: added$.asObservable(),
    replaced$: replaced$.asObservable(),
    removed$: removed$.asObservable(),
    add,
    replace,
    getByKey,
    getAll,
    isEmpty,
    registry,
    remove,
    getLength,
    forEach,
    find,
    ...destroyable
  };
}
