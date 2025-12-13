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

export function getAllEntitiesWithEveryTag<T>(
  tagList: ReadonlyArray<string>,
  registry: ReadonlyMap<string, T>
): ReadonlyArray<T> {
  if (tagList.length === 0) return [];

  return Array.from(registry.values()).filter((obj) => tagList.every((tag: string) => obj.tags.includes(tag)));
}
