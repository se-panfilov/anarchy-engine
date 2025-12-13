export type TWithTagsMixin = Readonly<{
  setTags: (tagsList: ReadonlyArray<string>) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  hasTag: (tag: string) => boolean;
  getTags: () => ReadonlyArray<string>;
  clearTags: () => void;
}>;

export type TWithReadonlyTags = Readonly<{
  tags: ReadonlyArray<string>;
}>;
