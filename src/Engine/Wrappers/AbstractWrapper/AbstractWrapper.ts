import { nanoid } from 'nanoid';
import type { IWrapper } from '@Engine/Models';

export function AbstractWrapper<T>(entity: T): IWrapper<T> {
  const id: string = nanoid();

  return {
    get id(): string {
      return id;
    },
    get entity(): T {
      return entity;
    }
  };
}
