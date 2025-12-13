export type IParamsFromConfig<C, P> = Readonly<{
  configToParams: (config: C) => P;
}>;
