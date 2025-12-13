export type IWithTagsMixin<T> = Readonly<{
  setTags: (tagsList: ReadonlyArray<T | string>) => void;
  addTag: (tag: T | string) => void;
  removeTag: (tag: T | string) => void;
  hasTag: (tag: T | string) => boolean;
  getTags: () => ReadonlyArray<T | string>;
  clearTags: () => void;
}>;

export type IWithReadonlyTags<T> = Readonly<{
  tags: ReadonlyArray<T | string>;
}>;
