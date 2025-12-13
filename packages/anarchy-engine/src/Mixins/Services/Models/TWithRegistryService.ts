export type TWithRegistryService<R> = Readonly<{
  getRegistry: () => R;
}>;
