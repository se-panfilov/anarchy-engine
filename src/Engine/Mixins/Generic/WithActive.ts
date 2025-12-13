export function withActive<T>(wrapper: T, isActive: boolean): T & { isActive: boolean; _setActive: (isActive: boolean) => void } {
  const result = { ...wrapper, isActive };

  // eslint-disable-next-line functional/immutable-data
  return { ...result, _setActive: (isActive: boolean): void => void (result.isActive = isActive) };
}
