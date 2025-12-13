export type TCreateEntityFactoryFn<T, P, D = Record<string, any> | undefined, S extends Record<string, any> | undefined = undefined, F extends Record<string, boolean> | undefined = undefined> = (
  params: P,
  dependencies: D,
  settings?: S,
  flags?: F
) => T;
