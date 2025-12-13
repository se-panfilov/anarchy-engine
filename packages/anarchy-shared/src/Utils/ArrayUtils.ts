export function omitInArray<T>(array: ReadonlyArray<T>, item: T): ReadonlyArray<T> {
  return array.filter((arrayItem: T): boolean => arrayItem !== item);
}

export function forEachEnum<T extends Record<string | number, string | number>>(enumType: T, callback: (value: number | string, key: number | string, index: number) => void): void {
  Object.keys(enumType).forEach((key: string, index: number): void => callback(enumType[key], key, index));
}

export function removeDuplicates<T extends { id: string }>(array: ReadonlyArray<T>): ReadonlyArray<T> {
  const uniqueMap = new Map<string, T>();
  // eslint-disable-next-line functional/no-loop-statements
  for (const item of array) {
    uniqueMap.set(item.id, item);
  }
  return Array.from(uniqueMap.values());
}

export const removeDuplicatesStr = (arr: ReadonlyArray<string>): ReadonlyArray<string> => Array.from(new Set(arr));

export function asRecord<T, K extends keyof T, V extends string | number | symbol = T[K] & (string | number | symbol)>(key: K, list: ReadonlyArray<T>): Record<V, T> {
  return list.reduce(
    (acc, item) => {
      // eslint-disable-next-line functional/immutable-data
      acc[item[key] as V] = item;
      return acc;
    },
    {} as Record<V, T>
  );
}

export function findDuplicateString(arr: ReadonlyArray<string>): string | undefined {
  const seen: Set<string> = new Set<string>();
  // eslint-disable-next-line functional/no-loop-statements
  for (const str of arr) {
    if (seen.has(str)) return str;
    seen.add(str);
  }
  return undefined;
}
