import type { CommonTag } from '@/Engine/Domains/Abstract';
import type { IWithTags } from '@/Engine/Mixins/Generic/Models';
import { omit } from '@/Engine/Utils';

export function withTags<T>(tagsList: ReadonlyArray<T | CommonTag | string> = []): IWithTags<T> {
  let tags: ReadonlyArray<T | CommonTag | string> = [...tagsList];

  return {
    addTag(tag: T | CommonTag | string): void {
      tags = [...tags, tag];
    },
    removeTag(tag: T | CommonTag | string): void {
      tags = omit(tags, tag);
    },
    hasTag(tag: T | CommonTag | string): boolean {
      return tags.includes(tag);
    },
    get tags(): ReadonlyArray<T | CommonTag | string> {
      return tags;
    }
  };
}
