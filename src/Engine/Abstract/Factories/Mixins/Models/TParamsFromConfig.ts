export type TParamsFromConfigWithDependencies<C, P, D = any> = Readonly<{
  configToParams: (config: C, dependencies: D) => P;
}>;

export type TParamsFromConfigWithoutDependencies<C, P> = Readonly<{
  configToParams: (config: C) => P;
}>;

export type TParamsFromConfig<C, P, D = any> = TParamsFromConfigWithDependencies<C, P, D> | TParamsFromConfigWithoutDependencies<C, P>;

export type TParamsFromConfigAsyncWithDependencies<C, P, D> = Readonly<{
  configToParamsAsync: (config: C, dependencies: D) => P;
}>;

export type TParamsFromConfigAsyncWithoutDependencies<C, P> = Readonly<{
  configToParamsAsync: (config: C) => Promise<P>;
}>;

export type TParamsFromConfigAsync<C, P, D = any> = TParamsFromConfigAsyncWithDependencies<C, P, D> | TParamsFromConfigAsyncWithoutDependencies<C, P>;

// export type TParamsFromConfig<C, P> = Readonly<{
//   configToParams: (config: C, dependencies?: Record<string, any>) => P;
// }>;
//
// export type TParamsFromConfigAsync<C, P> = Readonly<{
//   configToParamsAsync: (config: C, dependencies?: Record<string, any>) => Promise<P>;
// }>;
