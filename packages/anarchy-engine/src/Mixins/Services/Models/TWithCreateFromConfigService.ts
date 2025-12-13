export type TCreateFromConfigFn<C, T> = (config: ReadonlyArray<C>) => ReadonlyArray<T>;
export type TCreateFromConfigWithOptionsFn<C, T, O extends Record<string, any> | undefined> = (config: ReadonlyArray<C>, options?: O) => ReadonlyArray<T>;
export type TAnyCreateFromConfigFn<C, T, O extends Record<string, any> | undefined = undefined> = TCreateFromConfigFn<C, T> | TCreateFromConfigWithOptionsFn<C, T, O>;

export type TWithCreateFromConfigService<C, T, O extends Record<string, any> | undefined = undefined> = Readonly<{
  createFromConfig: TAnyCreateFromConfigFn<C, T, O>;
}>;
