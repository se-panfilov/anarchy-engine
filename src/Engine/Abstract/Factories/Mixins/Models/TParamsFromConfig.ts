// export type TParamsFromConfig<C, P, D> = Readonly<{
//   configToParams: D extends Record<string, any> ? (config: C, dependencies: D) => P : (config: C) => P;
// }>;

export type TParamsFromConfig<C, P> = Readonly<{
  configToParams: (config: C, dependencies?: Record<string, any>) => P;
}>;

// export type TParamsFromConfigAsync<C, P, D> = Readonly<{
//   configToParamsAsync: D extends Record<string, any> ? (config: C, dependencies: D) => P : (config: C) => P;
// }>;

export type TParamsFromConfigAsync<C, P> = Readonly<{
  configToParamsAsync: (config: C, dependencies?: Record<string, any>) => Promise<P>;
}>;
