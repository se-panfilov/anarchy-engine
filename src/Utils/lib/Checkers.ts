export function isDefined<T>(value: T | undefined | null): value is T {
  return <T>value !== undefined && <T>value !== null;
}

export function isNotDefined<T>(value: T | undefined | null): value is undefined | null {
  return <T>value === undefined || <T>value === null;
}
