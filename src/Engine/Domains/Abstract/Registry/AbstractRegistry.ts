import type { IMultitonRegistrable, IRegistrable } from '@Engine/Domains/Mixins';
import type { RegistryType } from '@Engine/Registries';
import { getAll, getAllEntitiesWithEveryTag, getAllEntitiesWithSomeTag, isDestroyable, isNotDefined } from '@Engine/Utils';
import { nanoid } from 'nanoid';
import type { Observable } from 'rxjs';
import { Subject } from 'rxjs';

import type { IAbstractRegistry } from '../Models';

export function AbstractRegistry<T extends IRegistrable | IMultitonRegistrable>(type: RegistryType): IAbstractRegistry<T> {
  const id: string = type + '_registry_' + nanoid();
  const registry: Map<string, T> = new Map();
  const added$: Subject<T> = new Subject<T>();
  const replaced$: Subject<T> = new Subject<T>();
  const removed$: Subject<T> = new Subject<T>();
  const destroyed$: Subject<void> = new Subject<void>();

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

  function getById(id: string): T | undefined {
    return registry.get(id);
  }

  function remove(id: string): void | never {
    const entity: T | undefined = registry.get(id);
    if (isNotDefined(entity)) throw new Error(`Cannot remove an entity with id "${id}" from registry ${id}: not exist`);
    registry.delete(id);
    removed$.next(entity);
  }

  function destroy(): void {
    destroyed$.next();
    destroyed$.complete();
    added$.complete();
    replaced$.complete();
    removed$.complete();
    registry.forEach((obj: T): void => {
      if (isDestroyable(obj)) obj.destroy();
    });
    registry.clear();
  }

  function getUniqWithSomeTag(tags: ReadonlyArray<string>): T | undefined | never {
    const result: ReadonlyArray<T> = getAllEntitiesWithSomeTag(tags, registry);
    if (result.length > 1) throw new Error(`Entity with tags "${tags.toString()}" is not uniq in "${type}"`);
    return result[0];
  }

  function getUniqWithEveryTag(tags: ReadonlyArray<string>): T | undefined | never {
    const result: ReadonlyArray<T> = getAllEntitiesWithEveryTag(tags, registry);
    if (result.length > 1) throw new Error(`Entity with tags "${tags.toString()}" is not uniq in "${type}"`);
    return result[0];
  }

  function getUniqByTag(tag: string): T | undefined | never {
    return getUniqWithSomeTag([tag]);
  }

  return {
    get id(): string {
      return id;
    },
    get type(): RegistryType {
      return type;
    },
    get added$(): Observable<T> {
      return added$.asObservable();
    },
    get replaced$(): Observable<T> {
      return replaced$.asObservable();
    },
    get destroyed$(): Observable<void> {
      return destroyed$.asObservable();
    },
    get removed$(): Observable<T> {
      return removed$.asObservable();
    },
    add,
    replace,
    getById,
    getAll: () => getAll(registry),
    getAllWithEveryTag: (tags: ReadonlyArray<string>): ReadonlyArray<T> => getAllEntitiesWithEveryTag(tags, registry),
    getAllWithSomeTag: (tags: ReadonlyArray<string>): ReadonlyArray<T> => getAllEntitiesWithSomeTag(tags, registry),
    getUniqWithSomeTag,
    getUniqWithEveryTag,
    getUniqByTag,
    registry,
    remove,
    isDestroyed: false,
    destroy
  };
}

function isMultitonEntity(entity: IRegistrable | IMultitonRegistrable): entity is IMultitonRegistrable {
  return !!(entity as IMultitonRegistrable).key;
}
