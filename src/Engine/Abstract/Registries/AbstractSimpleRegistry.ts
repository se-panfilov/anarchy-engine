import { nanoid } from 'nanoid';

import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { TAbstractSimpleRegistry, TWithBaseAccessorsRegistry, TWithReactiveRegistry } from '@/Engine/Abstract/Models';
import { withBaseAccessorsRegistry } from '@/Engine/Abstract/Registries/Mixin';
import { withReactiveRegistry } from '@/Engine/Abstract/Registries/Mixin/Registry/WithReactiveRegistry';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { isNotDefined } from '@/Engine/Utils';

export function AbstractSimpleRegistry<T>(type: RegistryType): TAbstractSimpleRegistry<T> {
  const id: string = type + '_registry_' + nanoid();
  const registry: Map<string, T> = new Map();

  const destroyable: TDestroyable = destroyableMixin();
  const reactiveRegistry: TWithReactiveRegistry<T> = withReactiveRegistry<T>(registry, destroyable);
  const { isEmpty, getLength, forEach, asArray, find, getRegistryCopy, clear }: TWithBaseAccessorsRegistry<T> = withBaseAccessorsRegistry<T>(registry);

  function add(key: string, value: T): void | never {
    if (registry.has(key)) throw new Error(`Cannot add to a registry("${id}") a value with key "${key}": The key is already exist in the registry`);
    registry.set(key, value);
    reactiveRegistry.added$.next({ key, value });
  }

  function replace(key: string, value: T): void | never {
    if (!registry.has(key)) throw new Error(`Cannot replace in a registry("${id}") a value with key "${key}": The key is not exist in the registry`);
    registry.set(key, value);
    reactiveRegistry.replaced$.next({ key, value });
  }

  const findByKey = (key: string): T | undefined => registry.get(key);

  function findKeyByValue(value: T): string | undefined {
    // eslint-disable-next-line functional/no-loop-statements
    for (const [key, val] of registry.entries()) if (val === value) return key;
    return undefined;
  }

  function remove(key: string): void | never {
    const value: T | undefined = registry.get(key);
    if (isNotDefined(value)) throw new Error(`Cannot remove in a registry("${id}") a value with key "${key}": The key is not exist in the registry`);
    registry.delete(key);
    reactiveRegistry.removed$.next({ key, value });
  }

  const asObject = (): Record<string, T> => Object.fromEntries(registry.entries());

  return Object.assign(
    {
      id,
      add,
      added$: reactiveRegistry.added$.asObservable(),
      find,
      findByKey,
      findKeyByValue,
      forEach,
      asArray,
      getRegistryCopy,
      getLength,
      isEmpty,
      clear,
      remove,
      asObject,
      removed$: reactiveRegistry.removed$.asObservable(),
      replace,
      replaced$: reactiveRegistry.replaced$.asObservable(),
      type
    },
    reactiveRegistry,
    destroyable
  );
}
