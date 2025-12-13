export type IWrapper<T> = Readonly<{
  id: string;
  entity: T;
}>;
