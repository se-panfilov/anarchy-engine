import type { IAbstractRegistry, IWrapper } from '@Engine/Models';
import { RegistryName } from '@Engine/Registries';
import { findKeyByTag, isNotDefined } from '@Engine/Utils';
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

  // TODO (S.Panfilov) CWP fix these methods
  // TODO (S.Panfilov) this method should return all entities with the tag, not only the very first one
  function getAllWithTag(tag: string): ReadonlyArray<T> | never {
    const id: string | undefined = findKeyByTag(tag, registry);
    if (isNotDefined(id)) throw new Error(`Cannot find an entity in "${name}" registry with a tag "${tag}"`);
    const entity: T | undefined = registry.get(id);
    if (isNotDefined(entity)) throw new Error(`Cannot find an entity in "${name}" registry with an id "${id}"`);
    return [entity];
  }

  function getByTag(tag: string): T | never {
    const id: string | undefined = findKeyByTag(tag, registry);
    if (isNotDefined(id)) throw new Error(`Cannot find an entity in "${name}" registry with a tag "${tag}"`);
    const entity: T | undefined = registry.get(id);
    if (isNotDefined(entity)) throw new Error(`Cannot find an entity in "${name}" registry with an id "${id}"`);
    return entity;
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
    getByTag,
    registry,
    remove,
    destroy
  };
}
