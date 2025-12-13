import type { IWithTagsMixin } from '@/Engine/Mixins/Generics/Models';
import { omitInArray } from '@/Engine/Utils';

export function withTagsMixin(tagsList: ReadonlyArray<string> = []): IWithTagsMixin {
  const state: { tags: ReadonlyArray<string> } = { tags: [...tagsList] };

  return {
    setTags(tagsList: ReadonlyArray<string>): void {
      // eslint-disable-next-line functional/immutable-data
      state.tags = [...tagsList];
    },
    addTag(tag: string): void {
      // eslint-disable-next-line functional/immutable-data
      state.tags = [...state.tags, tag];
    },
    removeTag(tag: string): void {
      // eslint-disable-next-line functional/immutable-data
      state.tags = omitInArray(state.tags, tag);
    },
    hasTag(tag: string): boolean {
      return state.tags.includes(tag);
    },
    getTags(): ReadonlyArray<string> {
      return state.tags;
    },
    clearTags(): void {
      // eslint-disable-next-line functional/immutable-data
      state.tags = [];
    }
  };
}
