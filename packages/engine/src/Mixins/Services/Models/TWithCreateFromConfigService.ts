export type TWithCreateFromConfigService<C, T> = Readonly<{
  createFromConfig: (config: ReadonlyArray<C>) => ReadonlyArray<T>;
}>;

export type TWithCreateFromConfigServiceWithHooks<C, T, H> = Readonly<{
  createFromConfig: (config: ReadonlyArray<C>, hooks?: H) => ReadonlyArray<T>;
}>;
