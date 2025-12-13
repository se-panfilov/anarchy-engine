export function cleanObject<T extends Record<string, unknown>>(obj: T): void {
  Object.keys(obj).forEach((key: keyof T): void => {
    // eslint-disable-next-line functional/immutable-data
    obj[key] = null as any;
    // eslint-disable-next-line functional/immutable-data
    delete obj[key];
  });
}

export function isObject(obj: unknown, shouldAllowCustomObjects: boolean = false): obj is Record<string, unknown> {
  if (!obj) return false;

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

export function filterOutEmptyFields<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, value]: [string, unknown]): boolean => value !== undefined && value !== null && value !== Infinity && value !== -Infinity)) as T;
}

export type TDeepPartial<T> = T extends ReadonlyArray<infer U> ? ReadonlyArray<TDeepPartial<U>> : T extends object ? { readonly [K in keyof T]?: TDeepPartial<T[K]> } : T;

export function mergeDeep<T>(base: T, patch?: TDeepPartial<T>): T {
  if (patch === undefined) return base;

  if (!isObject(base) || Array.isArray(patch)) return patch as T;
  const out: Record<string, unknown> = { ...(base as any) };

  for (const key of Object.keys(patch as object)) {
    const pv = (patch as any)[key];
    if (pv === undefined) continue;
    const bv = (base as any)[key];

    if (Array.isArray(pv)) {
      out[key] = pv.slice();
    } else if (isObject(pv) && isObject(bv)) {
      out[key] = mergeDeep(bv, pv as any);
    } else {
      out[key] = pv as any;
    }
  }

  return out as T;
}
