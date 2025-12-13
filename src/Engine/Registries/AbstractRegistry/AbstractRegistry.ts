import type { IAbstractRegistry, IWrapper } from '@Engine/Models';
import { nanoid } from 'nanoid';
import { Subject } from 'rxjs';
import { isNotDefined } from '@Engine/Utils';

export function AbstractRegistry<T extends IWrapper<unknown>>(): IAbstractRegistry<T> {
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
    registry,
    remove,
    destroy
  };
}
