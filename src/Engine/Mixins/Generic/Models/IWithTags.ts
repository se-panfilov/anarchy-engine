import type { CommonTag } from '@/Engine/Abstract';

export type IWithTags<T> = Readonly<{
  setTags: (tagsList: ReadonlyArray<T | CommonTag | string>) => void;
  addTag: (tag: T | CommonTag | string) => void;
  removeTag: (tag: T | CommonTag | string) => void;
  hasTag: (tag: T | CommonTag | string) => boolean;
  getTags: () => ReadonlyArray<T | CommonTag | string>;
  clearTags: () => void;
}>;

export type IWithReadonlyTags<T> = Readonly<{
  tags: ReadonlyArray<T | CommonTag | string>;
}>;
