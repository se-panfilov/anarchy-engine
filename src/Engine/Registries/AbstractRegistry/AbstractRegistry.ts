import type { IAbstractRegistry, IWrapper } from '@Engine/Models';
import { nanoid } from 'nanoid';

export function AbstractRegistry<T extends IWrapper<unknown>>(): IAbstractRegistry<T> {
  const id: string = nanoid();
  const registry: Map<string, T> = new Map();

  function add(entity: T): void | never {
    if (registry.has(entity.id))
      throw new Error(`Cannot add an entity with id "${entity.id}" to registry ${id}: already exist`);
    registry.set(entity.id, entity);
  }

  function replace(entity: T): void | never {
    if (registry.has(entity.id))
      throw new Error(`Cannot replace an entity with id "${entity.id}" in registry ${id}: not exist`);
    registry.set(entity.id, entity);
  }

  function getById(id: string): T | undefined {
    return registry.get(id);
  }

  function remove(id: string): void | never {
    if (registry.has(id)) throw new Error(`Cannot remove an entity with id "${id}" from registry ${id}: not exist`);
    registry.delete(id);
  }

  function destroy(): void {
    registry.clear();
  }

  return {
    get id(): string {
      return id;
    },
    add,
    replace,
    getById,
    registry,
    remove,
    destroy
  };
}
