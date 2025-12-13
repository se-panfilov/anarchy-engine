import type { TWithTags } from '@Engine/Mixins';
import type { TWriteable } from '@Shared/Utils';
import { omitInArray } from '@Shared/Utils';

export function setTags<T extends TWithTags>(entity: T, tagsList: ReadonlyArray<string>): void {
  // eslint-disable-next-line functional/immutable-data
  (entity as TWriteable<T>).tags = [...tagsList];
}

export function addTag<T extends TWithTags>(entity: T, tag: string): void {
  // eslint-disable-next-line functional/immutable-data
  (entity as TWriteable<T>).tags = [...(entity.tags ?? []), tag];
}

export function removeTag<T extends TWithTags>(entity: T, tag: string): void {
  // eslint-disable-next-line functional/immutable-data
  (entity as TWriteable<T>).tags = omitInArray(entity.tags ?? [], tag);
}

export function hasTag<T extends TWithTags>(entity: T, tag: string): boolean {
  return (entity.tags ?? []).includes(tag);
}

export function getTags<T extends TWithTags>(entity: T): ReadonlyArray<string> {
  return entity.tags ?? [];
}

export function clearTags<T extends TWithTags>(entity: T): void {
  // eslint-disable-next-line functional/immutable-data
  (entity as TWriteable<T>).tags = [];
}
