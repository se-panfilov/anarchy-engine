export function getAllEntitiesWithEveryTag<T extends { tags: ReadonlyArray<string> }>(
  tagList: ReadonlyArray<string>,
  registry: ReadonlyMap<string, T>
): ReadonlyArray<T> {
  if (tagList.length === 0) return [];

  return Array.from(registry.values()).filter((obj: T) => tagList.every((tag: string) => obj.tags.includes(tag)));
}

export function getAllEntitiesWithSomeTag<T extends { tags: ReadonlyArray<string> }>(
  tagList: ReadonlyArray<string>,
  registry: ReadonlyMap<string, T>
): ReadonlyArray<T> {
  if (tagList.length === 0) return [];

  return Array.from(registry.values()).filter((obj: T) => tagList.some((tag: string) => obj.tags.includes(tag)));
}
