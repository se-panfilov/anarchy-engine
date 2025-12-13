export type TParamsFromConfig<C, P> = Readonly<{
  configToParams: (config: C, dependencies?: Record<string, any>) => P;
}>;

export type TParamsFromConfigAsync<C, P> = Readonly<{
  configToParamsAsync: (config: C, dependencies?: Record<string, any>) => Promise<P>;
}>;
