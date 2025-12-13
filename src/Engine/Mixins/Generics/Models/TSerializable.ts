export type TSerializable<T, D = any> = TSerializableWithDependencies<T, D> | TSerializableNoDependencies<T>;

export type TSerializableWithDependencies<T, D> = Readonly<{
  serialize: (dependencies: D) => T;
}>;

export type TSerializableNoDependencies<T> = Readonly<{
  serialize: () => T;
}>;
