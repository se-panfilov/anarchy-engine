export type TWithResourcesRegistryService<R> = Readonly<{
  getResourceRegistry: () => R;
}>;
