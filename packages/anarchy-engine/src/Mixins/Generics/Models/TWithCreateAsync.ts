export type TWithCreateAsync<T, P, D> = Readonly<{
  createAsync: (params: P, dependencies: D) => Promise<T>;
}>;
