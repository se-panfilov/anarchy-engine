export function findInMap<K, V>(map: Map<K, V>, cb: (value: V, key: K) => boolean): V | undefined {
  // eslint-disable-next-line functional/no-loop-statements
  for (const [key, value] of map) {
    if (cb(value, key)) return map.get(key);
  }
  return undefined;
}

export function findKeyInMap<K, V>(map: Map<K, V>, cb: (value: V, key: K) => boolean): K | undefined {
  // eslint-disable-next-line functional/no-loop-statements
  for (const [key, value] of map) {
    if (cb(value, key)) return key;
  }
  return undefined;
}

// NOTE: Slow O(n) linear lookup
export function getKeyByValue<K, V>(map: Map<K, V>, value: V): K | undefined {
  // eslint-disable-next-line functional/no-loop-statements
  for (const [key, val] of map.entries()) if (val === value) return key;
  return undefined;
}
