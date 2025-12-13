export type TCreateEntityFactoryFn<T, P, D = Record<string, any> | undefined> = (params: P, dependencies: D) => T;
