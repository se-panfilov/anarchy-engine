import type { TAbstractEntityRegistry } from '@/Engine/Abstract/Models';
import type { LookUpStrategy } from '@/Engine/Abstract/Registries';
import type { TRegistrable, TWithActiveMixin } from '@/Engine/Mixins';

import { isNotDefined } from './CheckUtils';
import { hasTag } from './TagsUtils';

export const asArray = <T>(registry: ReadonlyMap<string, T>): ReadonlyArray<T> => Array.from(registry.values());

export function getAllEntitiesWithTags<T extends TRegistrable>(tagList: ReadonlyArray<string>, registry: ReadonlyMap<string, T>, strategy: LookUpStrategy): ReadonlyArray<T> {
  if (tagList.length === 0) return [];

  const result: Array<T> = [];

  // eslint-disable-next-line functional/no-loop-statements
  for (const entity of registry.values()) {
    // eslint-disable-next-line functional/immutable-data
    if (shouldHaveTags(entity, tagList, strategy)) result.push(entity);
  }

  return result;
}

export function getAllEntitiesWithTag<T extends TRegistrable>(tag: string, registry: ReadonlyMap<string, T>): ReadonlyArray<T> {
  const result: Array<T> = [];

  // eslint-disable-next-line functional/no-loop-statements
  for (const entity of registry.values()) {
    // eslint-disable-next-line functional/immutable-data
    if (hasTag(entity, tag)) result.push(entity);
  }

  return result;
}

export function getAllEntitiesWithNames<T extends TRegistrable>(names: ReadonlyArray<string>, registry: ReadonlyMap<string, T>): ReadonlyArray<T> {
  return registry
    .values()
    .filter((entity: T): boolean => {
      if (isNotDefined(entity.name)) return false;
      return names.includes(entity.name);
    })
    .toArray();
}

export function getUniqEntityWithTags<T extends TRegistrable>(tagList: ReadonlyArray<string>, registry: ReadonlyMap<string, T>, strategy: LookUpStrategy): T | undefined {
  // eslint-disable-next-line functional/no-loop-statements
  for (const entity of registry.values()) {
    if (shouldHaveTags(entity, tagList, strategy)) return entity;
  }

  return undefined;
}

export function getUniqEntityWithTag<T extends TRegistrable>(tag: string, registry: ReadonlyMap<string, T>): T | undefined {
  // eslint-disable-next-line functional/no-loop-statements
  for (const entity of registry.values()) {
    if (hasTag(entity, tag)) return entity;
  }
  return undefined;
}

export function setActiveWrappedEntity<E extends TWithActiveMixin & TRegistrable>(registry: TAbstractEntityRegistry<E>, id: string): E | never {
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

export const shouldHaveTags = <T extends TRegistrable>(obj: T, tagList: ReadonlyArray<string>, strategy: LookUpStrategy): boolean => tagList[strategy]((tag: string) => hasTag(obj, tag));

export function findByUrl<T extends TRegistrable & Readonly<{ getUrl: () => string }>>(url: string, registry: TAbstractEntityRegistry<T>): T | undefined {
  return registry.find((value: T): boolean => value.getUrl() === url);
}
