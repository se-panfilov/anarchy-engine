export type TCreateFn<T, P> = (params: P) => T;
export type TCreateWithOptionsFn<T, P, O extends Record<string, any> | undefined> = (params: P, options?: O) => T;
export type TAnyCreateFn<T, P, O extends Record<string, any> | undefined = undefined> = TCreateFn<T, P> | TCreateWithOptionsFn<T, P, O>;

export type TCreateFromListFn<T, P> = (params: ReadonlyArray<P>) => ReadonlyArray<T>;
export type TCreateFromListWithOptionsFn<T, P, O extends Record<string, any> | undefined> = (params: ReadonlyArray<P>, options?: O) => ReadonlyArray<T>;
export type TAnyCreateFromListFn<T, P, O extends Record<string, any> | undefined = undefined> = TCreateFromListFn<T, P> | TCreateFromListWithOptionsFn<T, P, O>;

export type TWithCreateService<T, P, O extends Record<string, any> | undefined = undefined> = Readonly<{
  create: TAnyCreateFn<T, P, O>;
  createFromList: TAnyCreateFromListFn<T, P, O>;
}>;
