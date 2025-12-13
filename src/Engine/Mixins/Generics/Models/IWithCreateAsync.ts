export type IWithCreateAsync<T = any, P = any> = Readonly<{
  createAsync: (params: P, dependencies?: Record<string, any>) => Promise<T>;
}>;
