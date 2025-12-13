export type TExtractParams<F> = F extends { create: (params: infer P, ...rest: any[]) => any } ? P : never;
export type TExtractDeps<F> = F extends { create: (params: any, deps: infer D, ...rest: any[]) => any } ? D : never;
export type TExtractHooks<F> = F extends { create: (params: any, deps: any, hooks?: infer H) => any } ? H : undefined;
export type TExtractEntity<F> = F extends { create: (...args: any[]) => infer T } ? T : never;

export type TExtractCreateParams<F> = F extends (params: infer P, ...rest: any[]) => any ? P : never;
export type TExtractCreateHooks<F> = F extends (params: any, hooks?: infer H) => any ? H : undefined;
export type TExtractCreateReturn<F> = F extends (...args: any[]) => infer R ? R : never;
export type TExtractConfig<C2P> = C2P extends (config: infer C) => any ? C : never;
// export type TExtractParams<C2P> = C2P extends (config: any) => infer P ? P : never;
