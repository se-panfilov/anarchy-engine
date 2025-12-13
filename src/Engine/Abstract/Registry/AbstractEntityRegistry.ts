import { nanoid } from 'nanoid';

import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { IAbstractEntityRegistry, IWithBaseAccessorsRegistry, IWithReactiveRegistry } from '@/Engine/Abstract/Models';
import type { LookUpStrategy } from '@/Engine/Abstract/Registry/Constants';
import { withBaseAccessorsRegistry } from '@/Engine/Abstract/Registry/Mixin';
import { withReactiveRegistry } from '@/Engine/Abstract/Registry/Mixin/Registry/WithReactiveRegistry';
import type { IDestroyable, IMultitonRegistrable, IRegistrable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { findInMap, getAllEntitiesWithTag, getAllEntitiesWithTags, getUniqEntityWithTag, getUniqEntityWithTags, isNotDefined } from '@/Engine/Utils';

export function AbstractEntityRegistry<T extends IRegistrable | IMultitonRegistrable>(type: RegistryType): IAbstractEntityRegistry<T> {
  const id: string = type + '_registry_' + nanoid();
  const registry: Map<string, T> = new Map();

  const destroyable: IDestroyable = destroyableMixin();
  const { added$, replaced$, removed$ }: IWithReactiveRegistry<T> = withReactiveRegistry<T>(destroyable);
  const { isEmpty, getLength, forEach, getAll, find }: IWithBaseAccessorsRegistry<T> = withBaseAccessorsRegistry<T>(registry);

  function add(entity: T): void | never {
    if (registry.has(entity.id)) throw new Error(`Cannot add an entity with id "${entity.id}" to registry ${id}: already exist`);
    if (isMultitonEntity(entity)) {
      registry.forEach((v: T): void => {
        if ((v as IMultitonRegistrable).key === entity.key)
          throw new Error(`Cannot add an entity with key "${entity.key}" to multiton registry ${id}: already added. Only one instance per key is allowed.`);
      });
    }
    registry.set(entity.id, entity);
    added$.next(entity);
  }

  function replace(entity: T): void | never {
    if (registry.has(entity.id)) throw new Error(`Cannot replace an entity with id "${entity.id}" in registry ${id}: not exist`);
    registry.set(entity.id, entity);
    replaced$.next(entity);
  }

  const findById = (id: string): T | undefined => registry.get(id);
  const findByName = (name: string): T | undefined => findInMap(registry, (value: T): boolean => value.name === name);

  function remove(id: string): void | never {
    const entity: T | undefined = registry.get(id);
    if (isNotDefined(entity)) throw new Error(`Cannot remove an entity with id "${id}" from registry ${id}: not exist`);
    registry.delete(id);
    removed$.next(entity);
  }

  const findAllByTags = (tags: ReadonlyArray<string>, strategy: LookUpStrategy): ReadonlyArray<T> => getAllEntitiesWithTags(tags, registry, strategy);
  const findAllByTag = (tag: string): ReadonlyArray<T> => getAllEntitiesWithTag(tag, registry);

  const findByTags = (tags: ReadonlyArray<string>, strategy: LookUpStrategy): T | undefined | never => getUniqEntityWithTags(tags, registry, strategy);
  const findByTag = (tag: string): T | undefined | never => getUniqEntityWithTag(tag, registry);

  return {
    id,
    type,
    added$: added$.asObservable(),
    replaced$: replaced$.asObservable(),
    removed$: removed$.asObservable(),
    add,
    replace,
    findById,
    findByName,
    getAll,
    findAllByTags: findAllByTags,
    findAllByTag: findAllByTag,
    findByTags: findByTags,
    findByTag: findByTag,
    isEmpty,
    registry,
    remove,
    getLength,
    forEach,
    find,
    ...destroyable
  };
}

function isMultitonEntity(entity: IRegistrable | IMultitonRegistrable): entity is IMultitonRegistrable {
  return !!(entity as IMultitonRegistrable).key;
}
