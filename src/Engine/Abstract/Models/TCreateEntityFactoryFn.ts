export type TCreateAsyncEntityFactoryFn<T, P> = (params: P, dependencies?: Record<string, any>) => Promise<T>;
export type TCreateEntityFactoryFn<T, P> = (params: P, dependencies?: Record<string, any>) => T;
