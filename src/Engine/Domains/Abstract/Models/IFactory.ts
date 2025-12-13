export type IFactory<T = any, P = any> = Readonly<{
  id: string;
  type: string;
  create: (params: P) => T;
}>;
