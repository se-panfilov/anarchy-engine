import { nanoid } from 'nanoid';

import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { TAbstractEntityRegistry, TWithBaseAccessorsRegistry, TWithReactiveRegistry } from '@/Engine/Abstract/Models';
import type { LookUpStrategy } from '@/Engine/Abstract/Registries/Constants';
import { withBaseAccessorsRegistry } from '@/Engine/Abstract/Registries/Mixin';
import { withReactiveRegistry } from '@/Engine/Abstract/Registries/Mixin/Registry/WithReactiveRegistry';
import type { TDestroyable, TMultitonRegistrable, TRegistrable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { findInMap, getAllEntitiesWithTag, getAllEntitiesWithTags, getUniqEntityWithTag, getUniqEntityWithTags, isNotDefined } from '@/Engine/Utils';

export function AbstractEntityRegistry<T extends TRegistrable | TMultitonRegistrable>(type: RegistryType): TAbstractEntityRegistry<T> {
  const id: string = type + '_registry_' + nanoid();
  const registry: Map<string, T> = new Map();

  const destroyable: TDestroyable = destroyableMixin();
  const { added$, replaced$, removed$ }: TWithReactiveRegistry<T> = withReactiveRegistry<T>(destroyable);
  const { isEmpty, getLength, forEach, asArray, find, getRegistryCopy, clear }: TWithBaseAccessorsRegistry<T> = withBaseAccessorsRegistry<T>(registry);

  function add(entity: T): void | never {
    if (registry.has(entity.id)) throw new Error(`Cannot add an entity with id "${entity.id}" to registry ${id}: already exist`);
    if (isMultitonEntity(entity)) {
      registry.forEach((v: T): void => {
        if ((v as TMultitonRegistrable).key === entity.key)
          throw new Error(`Cannot add an entity with key "${entity.key}" to multiton registry ${id}: already added. Only one instance per key is allowed.`);
      });
    }
    registry.set(entity.id, entity);
    added$.next({ key: entity.id, value: entity });
  }

  function replace(entity: T): void | never {
    if (!registry.has(entity.id)) throw new Error(`Cannot replace an entity with id "${entity.id}" in registry ${id}: not exist`);
    registry.set(entity.id, entity);
    replaced$.next({ key: entity.id, value: entity });
  }

  const findById = (id: string): T | undefined => registry.get(id);
  const findByName = (name: string): T | undefined => findInMap(registry, (value: T): boolean => value.name === name);

  function remove(id: string): void | never {
    const entity: T | undefined = registry.get(id);
    if (isNotDefined(entity)) throw new Error(`Cannot remove an entity with id "${id}" from registry ${id}: not exist`);
    registry.delete(id);
    removed$.next({ key: id, value: entity });
  }

  const findAllByTags = (tags: ReadonlyArray<string>, strategy: LookUpStrategy): ReadonlyArray<T> => getAllEntitiesWithTags(tags, registry, strategy);
  const findAllByTag = (tag: string): ReadonlyArray<T> => getAllEntitiesWithTag(tag, registry);

  const findByTags = (tags: ReadonlyArray<string>, strategy: LookUpStrategy): T | undefined | never => getUniqEntityWithTags(tags, registry, strategy);
  const findByTag = (tag: string): T | undefined | never => getUniqEntityWithTag(tag, registry);

  return {
    id,
    add,
    added$: added$.asObservable(),
    find,
    findAllByTag: findAllByTag,
    findAllByTags: findAllByTags,
    findById,
    findByName,
    findByTag: findByTag,
    findByTags: findByTags,
    forEach,
    asArray,
    getRegistryCopy,
    getLength,
    isEmpty,
    clear,
    registry,
    remove,
    removed$: removed$.asObservable(),
    replace,
    replaced$: replaced$.asObservable(),
    type,
    ...destroyable
  };
}

function isMultitonEntity(entity: TRegistrable | TMultitonRegistrable): entity is TMultitonRegistrable {
  return !!(entity as TMultitonRegistrable).key;
}
