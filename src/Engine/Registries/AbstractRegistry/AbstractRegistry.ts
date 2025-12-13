import type { IAbstractRegistry, IWrapper } from '@Engine/Models';
import { RegistryName } from '@Engine/Registries';
import { getAllEntitiesWithEveryTag, getAllEntitiesWithSomeTag, isNotDefined } from '@Engine/Utils';
import { nanoid } from 'nanoid';
import { Subject } from 'rxjs';

export function AbstractRegistry<T extends IWrapper<unknown>>(name: RegistryName): IAbstractRegistry<T> {
  const id: string = nanoid();
  const registry: Map<string, T> = new Map();
  const added$: Subject<T> = new Subject<T>();
  const replaced$: Subject<T> = new Subject<T>();
  const removed$: Subject<T> = new Subject<T>();

  function add(entity: T): void | never {
    if (registry.has(entity.id))
      throw new Error(`Cannot add an entity with id "${entity.id}" to registry ${id}: already exist`);
    registry.set(entity.id, entity);
    added$.next(entity);
  }

  function replace(entity: T): void | never {
    if (registry.has(entity.id))
      throw new Error(`Cannot replace an entity with id "${entity.id}" in registry ${id}: not exist`);
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
    added$.complete();
    replaced$.complete();
    removed$.complete();
    registry.clear();
  }

  function getUniqWithTag(tags: ReadonlyArray<string>): T | undefined | never {
    const result: ReadonlyArray<T> = getAllEntitiesWithSomeTag(tags, registry);
    if (result.length > 1) throw new Error(`Entity with tags "${tags.toString()}" is not uniq in "${name}"`);
    return result[0];
  }

  function getAllWithTag(tags: ReadonlyArray<string>, shouldMuchEveryTag: boolean = false): ReadonlyArray<T> {
    return shouldMuchEveryTag ? getAllEntitiesWithEveryTag(tags, registry) : getAllEntitiesWithSomeTag(tags, registry);
  }

  return {
    get id(): string {
      return id;
    },
    get added$(): Subject<T> {
      return added$;
    },
    get replaced$(): Subject<T> {
      return replaced$;
    },
    get removed$(): Subject<T> {
      return removed$;
    },
    add,
    replace,
    getById,
    getAllWithTag,
    getUniqWithTag,
    registry,
    remove,
    destroy
  };
}
