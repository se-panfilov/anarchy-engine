export type TSerializable<T> = Readonly<{
  serialize: () => T;
}>;
