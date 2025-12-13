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

export type TMergeBuilder<T> = {
  with: <B extends object>(next: B) => TMergeBuilder<T & B>;
  done: () => T;
};

// This is a type-safe equivalent of Object.assign (which can lose type information with more than 2-3 arguments).
// Avoid usage with getters/setters (they will become regular properties).
export function mergeChain<A extends object>(initial: A): TMergeBuilder<A> {
  return {
    with<B extends object>(next: B): TMergeBuilder<A & B> {
      // eslint-disable-next-line functional/immutable-data
      Object.assign(initial, next);
      return mergeChain(initial as A & B);
    },
    done(): A {
      return initial;
    }
  };
}

// type TMergeTupleToIntersection<T extends readonly object[]> = T extends [infer First extends object, ...infer Rest extends object[]] ? First & TMergeTupleToIntersection<Rest> : unknown;
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TMergeTupleToIntersection<T extends readonly object[]> = T extends [infer First extends object, ...infer Rest extends object[]] ? First & TMergeTupleToIntersection<Rest> : {};

// This is a type-safe equivalent of Object.assign (which can lose type information with more than 2-3 arguments).
// Avoid usage with getters/setters (they will become regular properties).
export function mergeAll<T extends readonly [object, ...object[]]>(...args: T): TMergeTupleToIntersection<T> {
  const target = args[0];
  // eslint-disable-next-line functional/no-loop-statements
  for (let i: number = 1; i < args.length; i++) {
    // eslint-disable-next-line functional/immutable-data
    Object.assign(target, args[i]);
  }
  return target as TMergeTupleToIntersection<T>;
}
