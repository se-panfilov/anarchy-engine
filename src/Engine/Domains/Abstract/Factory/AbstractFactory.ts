import { nanoid } from 'nanoid';

import type { IFactory } from '../Models';

export function AbstractFactory<T, P>(type: string): Omit<IFactory<T, P>, 'create'> {
  const id: string = type + '_factory_' + nanoid();

  return {
    get id(): string {
      return id;
    },
    get type(): string {
      return type + '_factory';
    }
  };
}
