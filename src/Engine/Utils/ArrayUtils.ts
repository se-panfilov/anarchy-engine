export function omit<T>(array: ReadonlyArray<T>, item: T): ReadonlyArray<T> {
  return array.filter((arrayItem: T): boolean => arrayItem !== item);
}
