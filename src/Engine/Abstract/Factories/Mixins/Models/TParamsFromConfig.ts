export type TConfigToParamsWithDependenciesFn<C, P, D = undefined> = (config: C, dependencies?: D) => P;

export type TParamsFromConfigWithDependencies<C, P, D> = Readonly<{
  configToParams: TConfigToParamsWithDependenciesFn<C, P, D>;
}>;

export type TConfigToParamsFn<C, P> = (config: C) => P;

export type TParamsFromConfig<C, P> = Readonly<{
  configToParams: TConfigToParamsFn<C, P>;
}>;

export type TParamsFromConfigAsyncWithDependencies<C, P, D> = Readonly<{
  configToParamsAsync: (config: C, dependencies: D) => P;
}>;

export type TParamsFromConfigAsync<C, P> = Readonly<{
  configToParamsAsync: (config: C) => Promise<P>;
}>;
