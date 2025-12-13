export type TWithSerializeEntity<C extends Record<string, any>, D extends Record<string, any> | undefined = undefined> = Readonly<{
  serializeEntity: (dependencies?: D) => C;
}>;
