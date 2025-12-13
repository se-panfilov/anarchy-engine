import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';
import type { LookUpStrategy } from '@/Engine/Abstract/Registries';
import type { TRegistrable, TWithActiveMixin } from '@/Engine/Mixins';
import { isNotDefined } from '@/Engine/Utils';

export const getAll = <T>(registry: ReadonlyMap<string, T>): ReadonlyArray<T> => Array.from(registry.values());

export function getAllEntitiesWithTags<T extends TRegistrable>(tagList: ReadonlyArray<string>, registry: ReadonlyMap<string, T>, strategy: LookUpStrategy): ReadonlyArray<T> {
  if (tagList.length === 0) return [];
  return Array.from(registry.values()).filter((obj: T) => shouldHaveTags(obj, tagList, strategy));
}

export function getAllEntitiesWithTag<T extends TRegistrable>(tag: string, registry: ReadonlyMap<string, T>): ReadonlyArray<T> {
  return Array.from(registry.values()).filter((obj: T) => obj.hasTag(tag));
}

export function getUniqEntityWithTags<T extends TRegistrable>(tagList: ReadonlyArray<string>, registry: ReadonlyMap<string, T>, strategy: LookUpStrategy): T | undefined {
  return Array.from(registry.values()).find((obj: T) => shouldHaveTags(obj, tagList, strategy));
}

export function getUniqEntityWithTag<T extends TRegistrable>(tag: string, registry: ReadonlyMap<string, T>): T | undefined {
  return Array.from(registry.values()).find((obj: T) => obj.hasTag(tag));
}

export function setActiveWrappedEntity<E extends TWithActiveMixin & TRegistrable>(registry: TProtectedRegistry<TAbstractEntityRegistry<E>>, id: string): E | never {
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

export const shouldHaveTags = <T extends TRegistrable>(obj: T, tagList: ReadonlyArray<string>, strategy: LookUpStrategy): boolean => tagList[strategy]((tag: string) => obj.hasTag(tag));

export function findByUrl<T extends TRegistrable & Readonly<{ getUrl: () => string }>>(url: string, registry: TProtectedRegistry<TAbstractEntityRegistry<T>>): T | undefined {
  return registry.find((value: T): boolean => value.getUrl() === url);
}
