export type TParamsFromConfigWithDependencies<C, P, D extends Record<string, any>> = Readonly<{
  configToParams: (config: C, dependencies: D) => P;
}>;

export type TParamsFromConfig<C, P> = Readonly<{
  configToParams: (config: C) => P;
}>;

export type TParamsFromConfigAsyncWithDependencies<C, P, D> = Readonly<{
  configToParamsAsync: (config: C, dependencies: D) => P;
}>;

export type TParamsFromConfigAsync<C, P> = Readonly<{
  configToParamsAsync: (config: C) => Promise<P>;
}>;
