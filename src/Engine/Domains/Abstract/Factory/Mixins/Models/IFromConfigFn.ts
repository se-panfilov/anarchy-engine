export type IFromConfigFn<T, C extends Record<string, any>> = (config: C, extra?: any) => T;
