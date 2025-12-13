export type TParamsFromConfigWithDependencies<C, P, D> = Readonly<{
  configToParams: D extends Record<string, any> ? (config: C, dependencies: D) => P : (config: C) => P;
}>;

export type TParamsFromConfigWithoutDependencies<C, P> = Readonly<{
  configToParams: (config: C) => P;
}>;

export type TParamsFromConfig<C, P, D = any> = TParamsFromConfigWithDependencies<C, P, D> | TParamsFromConfigWithoutDependencies<C, P>;

export type TParamsFromConfigAsyncWithDependencies<C, P, D> = Readonly<{
  configToParamsAsync: D extends Record<string, any> ? (config: C, dependencies: D) => P : (config: C) => P;
}>;

export type TParamsFromConfigAsyncWithoutDependencies<C, P> = Readonly<{
  configToParamsAsync: (config: C) => Promise<P>;
}>;

export type TParamsFromConfigAsync<C, P, D = any> = TParamsFromConfigAsyncWithDependencies<C, P, D> | TParamsFromConfigAsyncWithoutDependencies<C, P>;
