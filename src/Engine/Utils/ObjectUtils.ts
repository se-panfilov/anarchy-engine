import { isNotDefined } from './CheckUtils';

export function cleanObject<T extends Record<string, unknown>>(obj: T): void {
  Object.keys(obj).forEach((key: keyof T): void => {
    // eslint-disable-next-line functional/immutable-data, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    obj[key] = null as any;
    // eslint-disable-next-line functional/immutable-data
    delete obj[key];
  });
}

export function isObject(obj: unknown, shouldAllowCustomObjects: boolean = false): obj is Record<string, unknown> {
  if (isNotDefined(obj)) return false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
  const hasConstructor = shouldAllowCustomObjects ? true : (obj as any).constructor === Object;
  return typeof obj === 'object' && !Array.isArray(obj) && hasConstructor;
}

export const isEmptyObject = (obj: Record<string, unknown>): boolean => Object.keys(obj).length === 0 && isObject(obj);
