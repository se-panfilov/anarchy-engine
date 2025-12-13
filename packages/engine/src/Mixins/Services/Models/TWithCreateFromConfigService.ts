export type TWithCreateFromConfigService<C, T> = Readonly<{
  createFromConfig: (config: ReadonlyArray<C>) => ReadonlyArray<T>;
}>;
