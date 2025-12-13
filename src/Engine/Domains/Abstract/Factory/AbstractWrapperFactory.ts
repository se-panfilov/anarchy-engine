import { AbstractFactory } from '@Engine/Domains/Abstract';

import type { IAbstractWrapperFactory, ICreateFN, IWrapper } from '../Models';

export function AbstractWrapperFactory<T extends IWrapper<E>, E, P>(type: string, createFn: ICreateFN<T, P>): IAbstractWrapperFactory<T, E, P> {
  return {
    ...AbstractFactory(type, createFn)
  };
}
