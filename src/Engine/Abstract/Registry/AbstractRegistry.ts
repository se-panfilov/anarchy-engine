import { nanoid } from 'nanoid';
import { Subject } from 'rxjs';

import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { IAbstractRegistry } from '@/Engine/Abstract/Models';
import type { TagSelector } from '@/Engine/Abstract/Registry/Constants';
import type { IDestroyable, IMultitonRegistrable, IRegistrable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { getAll, getAllEntitiesWithTag, getAllEntitiesWithTags, getUniqEntityWithTag, getUniqEntityWithTags, isDestroyable, isNotDefined } from '@/Engine/Utils';

export function AbstractRegistry<T extends IRegistrable | IMultitonRegistrable>(type: RegistryType): IAbstractRegistry<T> {
  const id: string = type + '_registry_' + nanoid();
  const registry: Map<string, T> = new Map();
  const added$: Subject<T> = new Subject<T>();
  const replaced$: Subject<T> = new Subject<T>();
  const removed$: Subject<T> = new Subject<T>();

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

  const getById = (id: string): T | undefined => registry.get(id);

  function remove(id: string): void | never {
    const entity: T | undefined = registry.get(id);
    if (isNotDefined(entity)) throw new Error(`Cannot remove an entity with id "${id}" from registry ${id}: not exist`);
    registry.delete(id);
    removed$.next(entity);
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

  const getAllByTags = (tags: ReadonlyArray<string>, selector: TagSelector): ReadonlyArray<T> => getAllEntitiesWithTags(tags, registry, selector);
  const getAllByTag = (tag: string): ReadonlyArray<T> => getAllEntitiesWithTag(tag, registry);

  const isEmpty = (): boolean => registry.size === 0;

  const getUniqByTags = (tags: ReadonlyArray<string>, selector: TagSelector): T | undefined | never => getUniqEntityWithTags(tags, registry, selector);
  const getUniqByTag = (tag: string): T | undefined | never => getUniqEntityWithTag(tag, registry);

  return {
    id,
    type,
    added$: added$.asObservable(),
    replaced$: replaced$.asObservable(),
    removed$: removed$.asObservable(),
    add,
    replace,
    getById,
    getAll: () => getAll(registry),
    getAllByTags,
    getAllByTag,
    getUniqByTags,
    getUniqByTag,
    isEmpty,
    registry,
    remove,
    ...destroyable
  };
}

function isMultitonEntity(entity: IRegistrable | IMultitonRegistrable): entity is IMultitonRegistrable {
  return !!(entity as IMultitonRegistrable).key;
}
