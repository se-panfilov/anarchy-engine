export type TCreateEntityFactoryFn<T, P> = (params: P) => T;
export type TCreateEntityFactoryWithDependenciesFn<T, P, D> = (params: P, dependencies: D) => T;
