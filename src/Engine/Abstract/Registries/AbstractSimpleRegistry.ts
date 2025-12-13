import { nanoid } from 'nanoid';

import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { TAbstractSimpleRegistry, TWithBaseAccessorsRegistry, TWithReactiveRegistry } from '@/Engine/Abstract/Models';
import { withBaseAccessorsRegistry } from '@/Engine/Abstract/Registries/Mixin';
import { withReactiveRegistry } from '@/Engine/Abstract/Registries/Mixin/Registry/WithReactiveRegistry';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { findKeyWithValue, isNotDefined, mergeAll } from '@/Engine/Utils';

export function AbstractSimpleRegistry<T>(type: RegistryType): TAbstractSimpleRegistry<T> {
  const id: string = type + '_registry_' + nanoid();
  const registry: Map<string, T> = new Map();

  const destroyable: TDestroyable = destroyableMixin();
  const reactiveRegistry: TWithReactiveRegistry<T> = withReactiveRegistry<T>(registry, destroyable);
  const baseAccessors: TWithBaseAccessorsRegistry<T> = withBaseAccessorsRegistry<T>(registry);

  function add(key: string, value: T): void | never {
    if (registry.has(key)) throw new Error(`[REGISTRY]: Cannot add to an item by key "${key}" to registry("${id}"): The key is already exist in the registry.`);
    registry.set(key, value);
    reactiveRegistry.added$.next({ key, value });
  }

  function replace(key: string, value: T): void | never {
    if (!registry.has(key)) throw new Error(`[REGISTRY]: Cannot replace to an item by key "${key}" to registry("${id}"): The key is not exist in the registry.`);
    registry.set(key, value);
    reactiveRegistry.replaced$.next({ key, value });
  }

  const findByKey = (key: string): T | undefined => registry.get(key);

  const findKeyByValue = (value: T): string | undefined => findKeyWithValue(registry, value);

  function remove(key: string): void | never {
    const value: T | undefined = registry.get(key);
    if (isNotDefined(value)) throw new Error(`[REGISTRY]: Cannot remove an item by key "${key}" from registry "${id}": The key is not exist in the registry.`);
    registry.delete(key);
    reactiveRegistry.removed$.next({ key, value });
  }

  const asObject = (): Record<string, T> => Object.fromEntries(registry.entries());

  return mergeAll(
    {
      add,
      added$: reactiveRegistry.added$.asObservable(),
      asObject,
      findByKey,
      findKeyByValue,
      getByKey: (key: string): T | never => {
        const value: T | undefined = findByKey(key);
        if (isNotDefined(value)) throw new Error(`[REGISTRY]: Cannot get an item by key "${key}" from registry "${id}": The key is not exist in the registry.`);
        return value;
      },
      getKeyByValue: (value: T): string | never => {
        const key: string | undefined = findKeyByValue(value);
        if (isNotDefined(key)) throw new Error(`[REGISTRY]: Cannot get a key by value from registry "${id}": The value is not exist in the registry.`);
        return key;
      },
      id,
      remove,
      removed$: reactiveRegistry.removed$.asObservable(),
      replace,
      replaced$: reactiveRegistry.replaced$.asObservable(),
      type
    },
    baseAccessors,
    reactiveRegistry,
    destroyable
  );
}
