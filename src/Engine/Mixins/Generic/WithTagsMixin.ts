import type { IWithTagsMixin } from '@/Engine/Mixins/Generic/Models';
import { omitInArray } from '@/Engine/Utils';

export function withTagsMixin<T>(tagsList: ReadonlyArray<T | string> = []): IWithTagsMixin<T> {
  const state: { tags: ReadonlyArray<T | string> } = { tags: [...tagsList] };

  return {
    setTags(tagsList: ReadonlyArray<T | string>): void {
      // eslint-disable-next-line functional/immutable-data
      state.tags = [...tagsList];
    },
    addTag(tag: T | string): void {
      // eslint-disable-next-line functional/immutable-data
      state.tags = [...state.tags, tag];
    },
    removeTag(tag: T | string): void {
      // eslint-disable-next-line functional/immutable-data
      state.tags = omitInArray(state.tags, tag);
    },
    hasTag(tag: T | string): boolean {
      return state.tags.includes(tag);
    },
    getTags(): ReadonlyArray<T | string> {
      return state.tags;
    },
    clearTags(): void {
      // eslint-disable-next-line functional/immutable-data
      state.tags = [];
    }
  };
}
