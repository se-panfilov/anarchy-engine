import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TWriteable } from '@/Engine/Utils';
import { omitInArray } from '@/Engine/Utils';

export function setTags<T extends TWithReadonlyTags>(entity: T, tagsList: ReadonlyArray<string>): void {
  // eslint-disable-next-line functional/immutable-data
  (entity as TWriteable<T>).tags = [...tagsList];
}

export function addTag<T extends TWithReadonlyTags>(entity: T, tag: string): void {
  // eslint-disable-next-line functional/immutable-data
  (entity as TWriteable<T>).tags = [...(entity.tags ?? []), tag];
}

export function removeTag<T extends TWithReadonlyTags>(entity: T, tag: string): void {
  // eslint-disable-next-line functional/immutable-data
  (entity as TWriteable<T>).tags = omitInArray(entity.tags ?? [], tag);
}

export function hasTag<T extends TWithReadonlyTags>(entity: T, tag: string): boolean {
  return (entity.tags ?? []).includes(tag);
}

export function getTags<T extends TWithReadonlyTags>(entity: T): ReadonlyArray<string> {
  return entity.tags ?? [];
}

export function clearTags<T extends TWithReadonlyTags>(entity: T): void {
  // eslint-disable-next-line functional/immutable-data
  (entity as TWriteable<T>).tags = [];
}
