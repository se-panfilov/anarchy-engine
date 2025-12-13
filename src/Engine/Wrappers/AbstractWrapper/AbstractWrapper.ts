import type { IWrapper } from '@Engine/Models';
import { nanoid } from 'nanoid';

export function AbstractWrapper<T>(entity: T, { tags }: Readonly<{ tags: ReadonlyArray<string> }>): IWrapper<T> {
  const id: string = nanoid();

  return {
    get id(): string {
      return id;
    },
    get entity(): T {
      return entity;
    },
    tags
  };
}
