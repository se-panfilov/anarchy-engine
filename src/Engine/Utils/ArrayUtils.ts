export function omitInArray<T>(array: ReadonlyArray<T>, item: T): ReadonlyArray<T> {
  return array.filter((arrayItem: T): boolean => arrayItem !== item);
}

export function forEachEnum<T extends Record<string | number, string | number>>(enumType: T, callback: (value: number | string, key: number | string, index: number) => void): void {
  Object.keys(enumType).forEach((key: string, index: number): void => callback(enumType[key], key, index));
}
