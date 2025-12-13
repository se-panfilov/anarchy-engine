import { nanoid } from 'nanoid';

import type { IAbstractFactory, ICreateFN } from '../Models';

export function AbstractFactory<T, PRMS>(type: string, createFn: ICreateFN<T, PRMS>): IAbstractFactory<T, PRMS> {
  const id: string = type + '_factory_' + nanoid();

  function create(params: PRMS): T {
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
