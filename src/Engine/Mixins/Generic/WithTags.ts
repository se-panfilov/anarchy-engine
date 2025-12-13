import type { CommonTag } from '@/Engine/Domains/Abstract';
import type { IWithTags } from '@/Engine/Mixins/Generic/Models';
import { omit } from '@/Engine/Utils';

export function withTags<T>(tagsList: ReadonlyArray<T | CommonTag | string> = []): IWithTags<T> {
  const state: { tags: ReadonlyArray<T | CommonTag | string> } = { tags: [...tagsList] };

  return {
    setTags(tagsList: ReadonlyArray<T | CommonTag | string>): void {
      // eslint-disable-next-line functional/immutable-data
      state.tags = [...tagsList];
    },
    addTag(tag: T | CommonTag | string): void {
      // eslint-disable-next-line functional/immutable-data
      state.tags = [...state.tags, tag];
    },
    removeTag(tag: T | CommonTag | string): void {
      // eslint-disable-next-line functional/immutable-data
      state.tags = omit(state.tags, tag);
    },
    hasTag(tag: T | CommonTag | string): boolean {
      return state.tags.includes(tag);
    },
    getTags(): ReadonlyArray<T | CommonTag | string> {
      return state.tags;
    },
    clearTags(): void {
      // eslint-disable-next-line functional/immutable-data
      state.tags = [];
    }
  };
}
