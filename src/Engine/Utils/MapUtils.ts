export function findInMap<K, V>(map: Map<K, V>, cb: (value: V, key: K) => boolean): V | undefined {
  // eslint-disable-next-line functional/no-loop-statements
  for (const [key, value] of map) {
    if (cb(value, key)) {
      return map.get(key);
    }
  }
  return undefined;
}
