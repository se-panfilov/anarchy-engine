export type IWrapper<T> = Readonly<{
  id: string;
  entity: Readonly<T>;
}>;
