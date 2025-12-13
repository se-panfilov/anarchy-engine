export type TWithSerializeAllEntities<C> = Readonly<{
  serializeAllEntities: () => ReadonlyArray<C>;
}>;
