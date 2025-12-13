import type { TagSelector } from '@/Engine/Abstract/Registry';
import type { IRegistrable } from '@/Engine/Mixins';

export const getAll = <T>(registry: ReadonlyMap<string, T>): ReadonlyArray<T> => Array.from(registry.values());

// TODO (S.Panfilov) add unit tests
export function getAllEntitiesWithTags<T extends IRegistrable>(tagList: ReadonlyArray<string>, registry: ReadonlyMap<string, T>, selector: TagSelector): ReadonlyArray<T> {
  if (tagList.length === 0) return [];
  return Array.from(registry.values()).filter((obj: T) => tagList[selector]((tag: string) => obj.hasTag(tag)));
}

// TODO (S.Panfilov) add unit tests
export function getAllEntitiesWithTag<T extends IRegistrable>(tag: string, registry: ReadonlyMap<string, T>): ReadonlyArray<T> {
  return Array.from(registry.values()).filter((obj: T) => obj.hasTag(tag));
}

// TODO (S.Panfilov) add unit tests
export function getUniqEntityWithTags<T extends IRegistrable>(tagList: ReadonlyArray<string>, registry: ReadonlyMap<string, T>, selector: TagSelector): T | undefined {
  return Array.from(registry.values()).find((obj: T) => tagList[selector]((tag: string) => obj.hasTag(tag)));
}

// TODO (S.Panfilov) add unit tests
export function getUniqEntityWithTag<T extends IRegistrable>(tag: string, registry: ReadonlyMap<string, T>): T | undefined {
  return Array.from(registry.values()).find((obj: T) => obj.hasTag(tag));
}
