export type IAbstractFactory<T, P> = Readonly<{
  id: string;
  type: string;
  create: (params: P) => T;
}>;
