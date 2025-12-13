import type { TWrapper } from '@Engine/Abstract';

export function unWrapEntities<T>(list: ReadonlyArray<TWrapper<T>>): ReadonlyArray<T> {
  return list.map(({ entity }: Readonly<TWrapper<T>>) => entity);
}
