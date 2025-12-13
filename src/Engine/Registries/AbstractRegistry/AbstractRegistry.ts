import type { IAbstractRegistry, IReactiveWrapper } from '@Engine/Models';
import { nanoid } from 'nanoid';
import { Subject } from 'rxjs';

export function AbstractRegistry<T extends IReactiveWrapper<unknown>>(): IAbstractRegistry<T> {
  const id: string = nanoid();
  const add$: Subject<T> = new Subject<T>();
  const replace$: Subject<T> = new Subject<T>();
  const remove$: Subject<string> = new Subject<string>();
  const destroy$: Subject<void> = new Subject<void>();

  const registry: Map<string, T> = new Map();

  add$.subscribe((entity: T): void | never => {
    if (registry.has(entity.id))
      throw new Error(`Cannot add an entity with id "${entity.id}" to registry ${id}: already exist`);
    registry.set(entity.id, entity);
  });

  replace$.subscribe((entity: T): void | never => {
    if (registry.has(entity.id))
      throw new Error(`Cannot replace an entity with id "${entity.id}" in registry ${id}: not exist`);
    registry.set(entity.id, entity);
  });

  function getById(id: string): T {
    if (!registry.has(id)) throw new Error(`Cannot get an entity with id "${id}" from registry ${id}: not exist`);
    return registry.get(id);
  }

  remove$.subscribe((id: string): void | never => {
    if (registry.has(id)) throw new Error(`Cannot remove an entity with id "${id}" from registry ${id}: not exist`);
    registry.delete(id);
  });

  destroy$.subscribe(() => {
    add$.complete();
    replace$.complete();
    remove$.complete();
    destroy$.complete();
    registry.clear();
  });

  return {
    get id(): string {
      return id;
    },
    get add$(): Subject<T> {
      return add$;
    },
    get replace$(): Subject<T> {
      return replace$;
    },
    getById,
    registry,
    get remove$(): Subject<string> {
      return remove$;
    },
    get destroy$(): Subject<void> {
      return destroy$;
    }
  };
}
