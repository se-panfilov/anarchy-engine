export type TCreateEntityFactoryFn<T, P, D = Record<string, any> | undefined, O extends Record<string, any> | undefined = undefined> = (params: P, dependencies: D, options?: O) => T;
