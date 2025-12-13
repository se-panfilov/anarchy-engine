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
