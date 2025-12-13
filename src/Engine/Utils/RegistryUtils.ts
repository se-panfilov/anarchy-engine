import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract/Models';
import type { LookUpStrategy } from '@/Engine/Abstract/Registry';
import type { IRegistrable, IWithActiveMixin } from '@/Engine/Mixins';
import { isNotDefined } from '@/Engine/Utils';

export const getAll = <T>(registry: ReadonlyMap<string, T>): ReadonlyArray<T> => Array.from(registry.values());

export function getAllEntitiesWithTags<T extends IRegistrable>(tagList: ReadonlyArray<string>, registry: ReadonlyMap<string, T>, strategy: LookUpStrategy): ReadonlyArray<T> {
  if (tagList.length === 0) return [];
  return Array.from(registry.values()).filter((obj: T) => tagList[strategy]((tag: string) => obj.hasTag(tag)));
}

export function getAllEntitiesWithTag<T extends IRegistrable>(tag: string, registry: ReadonlyMap<string, T>): ReadonlyArray<T> {
  return Array.from(registry.values()).filter((obj: T) => obj.hasTag(tag));
}

export function getUniqEntityWithTags<T extends IRegistrable>(tagList: ReadonlyArray<string>, registry: ReadonlyMap<string, T>, strategy: LookUpStrategy): T | undefined {
  return Array.from(registry.values()).find((obj: T) => tagList[strategy]((tag: string) => obj.hasTag(tag)));
}

export function getUniqEntityWithTag<T extends IRegistrable>(tag: string, registry: ReadonlyMap<string, T>): T | undefined {
  return Array.from(registry.values()).find((obj: T) => obj.hasTag(tag));
}

export function setActiveWrappedEntity<E extends IWithActiveMixin & IRegistrable>(registry: IProtectedRegistry<IAbstractEntityRegistry<E>>, id: string): E | never {
  let result: E | undefined;
  registry.forEach((entity: E): void => {
    const isTarget: boolean = entity.id === id;
    if (isTarget) {
      entity._setActive(true, true);
      result = entity;
    } else entity._setActive(false, true);
  });

  if (isNotDefined(result)) throw new Error(`Cannot find an entity with id "${id}" in the registry.`);

  return result;
}
