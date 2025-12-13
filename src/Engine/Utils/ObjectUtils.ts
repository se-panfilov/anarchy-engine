export function cleanObject<T extends Record<string, unknown>>(obj: T): void {
  Object.keys(obj).forEach((key: keyof T): void => {
    // eslint-disable-next-line functional/immutable-data, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    obj[key] = null as any;
    // eslint-disable-next-line functional/immutable-data
    delete obj[key];
  });
}

export function isObject(obj: unknown, shouldAllowCustomObjects: boolean = false): obj is Record<string, unknown> {
  if (!obj) return false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
  const hasConstructor = shouldAllowCustomObjects ? true : (obj as any).constructor === Object;
  return typeof obj === 'object' && !Array.isArray(obj) && hasConstructor;
}

export const isEmptyObject = (obj: Record<string, unknown>): boolean => Object.keys(obj).length === 0 && isObject(obj);

export const omitInObjectWithoutMutation = <T extends Readonly<Record<string, unknown>>, K extends keyof T>(obj: T, keys: ReadonlyArray<K>): Omit<T, K> => {
  let result: T = {} as T;
  Object.keys(obj).forEach((key: keyof T): void => {
    if (!keys.includes(key as K)) {
      result = { ...result, [key]: obj[key] };
    }
  });
  return result;
};

export const omitInObjectWithMutation = <T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: ReadonlyArray<K>): Omit<T, K> => {
  // eslint-disable-next-line functional/immutable-data
  keys.forEach((key: K) => delete obj[key]);
  return obj;
};
