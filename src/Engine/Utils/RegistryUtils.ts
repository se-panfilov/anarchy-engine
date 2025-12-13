export function findKeyByTag<T extends { tag: string | undefined }>(
  tag: string,
  registry: ReadonlyMap<string, T>
): string | undefined {
  for (const [key, value] of registry) if (value.tag === tag) return key;
  return undefined;
}
