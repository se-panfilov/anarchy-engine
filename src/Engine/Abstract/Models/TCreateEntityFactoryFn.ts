export type TCreateAsyncEntityFactoryFn<T, P> = (params: P) => Promise<T>;
export type TCreateAsyncEntityFactoryWithDependenciesFn<T, P, D> = (params: P, dependencies: D) => Promise<T>;
export type TCreateEntityFactoryFn<T, P> = (params: P) => T;
export type TCreateEntityFactoryWithDependenciesFn<T, P, D> = (params: P, dependencies: D) => T;
