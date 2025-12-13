import type { CommonTag } from '@/Engine/Domains/Abstract';

export type IWithTags<T> = IWithReadonlyTags<T> &
  Readonly<{
    tags: ReadonlyArray<T | CommonTag | string>;
    addTag: (tag: T | CommonTag | string) => void;
    removeTag: (tag: T | CommonTag | string) => void;
    hasTag: (tag: T | CommonTag | string) => boolean;
  }>;

export type IWithReadonlyTags<T> = Readonly<{
  tags: ReadonlyArray<T | CommonTag | string>;
}>;
