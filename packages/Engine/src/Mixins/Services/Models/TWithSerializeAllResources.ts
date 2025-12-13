export type TWithSerializeAllResources<C> = Readonly<{
  serializeAllResources: () => ReadonlyArray<C>;
}>;
