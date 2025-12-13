export type TCreateFromServiceFn<T, P> = (params: P) => T;

export type TWithCreateService<T, P> = Readonly<{
  create: TCreateFromServiceFn<T, P>;
  createFromList: (params: ReadonlyArray<P>) => ReadonlyArray<T>;
}>;

export type TWithCreateServiceWithHooks<T, P, H> = Readonly<{
  create: TCreateFromServiceFn<T, P>;
  createFromList: (params: ReadonlyArray<P>, hooks?: H) => ReadonlyArray<T>;
}>;
