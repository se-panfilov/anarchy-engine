import type { LookUpStrategy } from '@/Engine/Abstract/Registry';
import type { IRegistrable } from '@/Engine/Mixins';

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
