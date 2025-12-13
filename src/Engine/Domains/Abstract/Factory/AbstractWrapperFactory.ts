import { AbstractFactory } from '@Engine/Domains/Abstract';

import type { IAbstractWrapperFactory, ICreateFN, IWrapper } from '../Models';

export function AbstractWrapperFactory<T extends IWrapper<ENT>, ENT, PRMS>(type: string, createFn: ICreateFN<T, PRMS>): IAbstractWrapperFactory<T, ENT, PRMS> {
  return {
    ...AbstractFactory(type, createFn)
  };
}
