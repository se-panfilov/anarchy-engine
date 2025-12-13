export type IParamsFromConfig<C, P> = Readonly<{
  configToParams: (config: C) => P;
}>;

export type IParamsFromConfigAsync<C, P> = Readonly<{
  configToParamsAsync: (config: C) => Promise<P>;
}>;
