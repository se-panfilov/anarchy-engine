import { nanoid } from 'nanoid';

import type { IAbstractFactory, ICreateFN } from '../Models';

export function AbstractFactory<T, P>(type: string, createFn: ICreateFN<T, P>): IAbstractFactory<T, P> {
  const id: string = type + '_factory_' + nanoid();

  function create(params: P): T {
    return createFn(params);
  }

  return {
    get id(): string {
      return id;
    },
    get type(): string {
      return type + '_factory';
    },
    create
  };
}
