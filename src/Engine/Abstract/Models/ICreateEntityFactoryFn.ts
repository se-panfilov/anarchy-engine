export type ICreateAsyncEntityFactoryFn<T, P> = (params: P, dependencies?: Record<string, any>) => Promise<T>;
export type ICreateEntityFactoryFn<T, P> = (params: P, dependencies?: Record<string, any>) => T;
