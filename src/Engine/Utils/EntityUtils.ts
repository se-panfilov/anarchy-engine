import type { IWrapper } from '@Engine/Models';

export function unWrapEntities<T>(list: ReadonlyArray<IWrapper<T>>): ReadonlyArray<T> {
  return list.map(({ entity }: Readonly<IWrapper<T>>) => entity);
}
