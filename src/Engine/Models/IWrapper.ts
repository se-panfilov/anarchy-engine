export type IWrapper<T> = Readonly<{
  id: string;
  entity: Readonly<T>;
  tags: ReadonlyArray<string>;
  destroy: () => void;
}>;
