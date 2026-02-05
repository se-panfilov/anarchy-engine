import type { TWrapper } from '@hellpig/anarchy-engine/Abstract';

export function unWrapEntities<T>(list: ReadonlyArray<TWrapper<T>>): ReadonlyArray<T> {
  return list.map(({ entity }: Readonly<TWrapper<T>>) => entity);
}
