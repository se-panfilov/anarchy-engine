export function findKeyByTag<T extends { tags: ReadonlyArray<string> }>(
  tag: string,
  registry: ReadonlyMap<string, T>
): string | undefined {
  // eslint-disable-next-line functional/no-loop-statements
  for (const [key, value] of registry) {
    if (value.tags?.includes(tag)) return key;
  }
  return undefined;
}
