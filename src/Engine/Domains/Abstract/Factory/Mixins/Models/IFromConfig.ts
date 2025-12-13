export type IFromConfig<T, C> = Readonly<{
  fromConfig: (config: C) => T;
}>;
