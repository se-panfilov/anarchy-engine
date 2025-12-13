import type { IWrapper } from '@Engine/Models';
import { nanoid } from 'nanoid';

export function AbstractWrapper<T>(entity: T): IWrapper<T> {
  const id: string = nanoid();

  return {
    get id(): string {
      return id;
    },
    get entity(): T {
      return entity;
    },
    tags: []
  };
}
