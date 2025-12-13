export type TWithCreateFromConfigAsyncService<C, R> = Readonly<{
  createFromConfigAsync: (config: ReadonlyArray<C>) => Promise<R>;
}>;
