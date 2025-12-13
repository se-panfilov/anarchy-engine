export type TParamsFromConfig<C, P, D> = Readonly<{
  configToParams: D extends Record<string, any> ? (config: C, dependencies: D) => P : (config: C) => P;
}>;

export type TParamsFromConfigAsync<C, P, D> = Readonly<{
  configToParamsAsync: D extends Record<string, any> ? (config: C, dependencies: D) => P : (config: C) => P;
}>;
