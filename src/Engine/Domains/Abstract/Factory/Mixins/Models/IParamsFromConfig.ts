export type IParamsFromConfig<C, P> = Readonly<{
  getParams: (config: C) => P;
}>;
