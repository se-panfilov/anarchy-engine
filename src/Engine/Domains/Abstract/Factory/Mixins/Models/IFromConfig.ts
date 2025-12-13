export type IFromConfig<C, P> = Readonly<{
  getParams: (config: C) => P;
}>;
