import type { TDeepPartial } from '@Anarchy/Shared/Utils/TypesUtils';
import { cloneDeepWith, isPlainObject } from 'lodash-es';

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

const filterValues = (value: unknown): boolean => value !== undefined && value !== null && value !== Infinity && value !== -Infinity;

export function filterOutEmptyFields<T extends Record<string, unknown> | ReadonlyArray<unknown>>(item: T): T {
  if (Array.isArray(item)) return item.filter(filterValues) as unknown as T;
  return Object.fromEntries(Object.entries(item).filter(([, value]: [string, unknown]): boolean => filterValues(value))) as T;
}

export function filterOutEmptyFieldsRecursive<T extends Record<string, unknown> | ReadonlyArray<unknown>>(input: T): T {
  const customizer = (value: unknown): unknown => {
    if (
      value === null ||
      typeof value !== 'object' ||
      value instanceof Date ||
      value instanceof RegExp ||
      value instanceof Map ||
      value instanceof Set ||
      (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView(value)) // TypedArray/DataView
    )
      return undefined;

    if (Array.isArray(value)) {
      const cleaned = (value as ReadonlyArray<unknown>).map((v) => cloneDeepWith(v, customizer));
      return cleaned.filter((v): boolean => v !== undefined);
    }

    if (isPlainObject(value)) {
      const src: Record<string, unknown> = value as Record<string, unknown>;
      return Object.entries(src)
        .filter(([, v]): boolean => v !== undefined)
        .map(([k, v]) => [k, cloneDeepWith(v, customizer)])
        .filter(([, cleanedValue]): boolean => cleanedValue !== undefined)
        .reduce((acc, [k, cleanedValue]) => ({ ...acc, [k]: cleanedValue }), {} as Record<string, unknown>);
    }

    return undefined;
  };

  return cloneDeepWith(input, customizer) as T;
}

// Merges objects but overrides only defined values from patch
export function patchObject<T extends Record<string, any>>(base: T, patch?: TDeepPartial<T>): T {
  if (patch === undefined) return base;

  if (!isObject(base) || Array.isArray(patch)) return patch as T;
  const out: Record<string, unknown> = { ...base };

  Object.entries(patch).forEach(([key, patchVal]): void => {
    if (patchVal === undefined) return;
    const baseVal = base[key];

    // eslint-disable-next-line functional/immutable-data
    out[key] = Array.isArray(patchVal) ? patchVal.slice() : isObject(patchVal) && isObject(baseVal) ? patchObject(baseVal, patchVal) : patchVal;
  });

  return out as T;
}
