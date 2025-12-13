export type TSerializable<T, D extends Record<string, any> | undefined = undefined> = Readonly<{
  serialize: (dependencies?: D) => T;
}>;
