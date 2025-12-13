export function getAll<T>(registry: ReadonlyMap<string, T>): ReadonlyArray<T> {
  return Array.from(registry.values());
}

export function getAllEntitiesWithEveryTag<T extends { tags: ReadonlyArray<string> }>(tagList: ReadonlyArray<string>, registry: ReadonlyMap<string, T>): ReadonlyArray<T> {
  return getEntitiesWithTag(tagList, registry, true);
}

export function getAllEntitiesWithSomeTag<T extends { tags: ReadonlyArray<string> }>(tagList: ReadonlyArray<string>, registry: ReadonlyMap<string, T>): ReadonlyArray<T> {
  return getEntitiesWithTag(tagList, registry, false);
}

function getEntitiesWithTag<T extends { tags: ReadonlyArray<string> }>(tagList: ReadonlyArray<string>, registry: ReadonlyMap<string, T>, shouldMatchAllTags: boolean): ReadonlyArray<T> {
  if (tagList.length === 0) return [];
  const methodName: 'every' | 'some' = shouldMatchAllTags ? 'every' : 'some';

  return Array.from(registry.values()).filter((obj: T) => tagList[methodName]((tag: string) => obj.tags.includes(tag)));
}
