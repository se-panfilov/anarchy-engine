import { AbstractFactory } from '@Engine/Domains/Abstract';
import type { IAbstractWrapperFactory, ICreateFN } from '@Engine/Domains/Abstract';
import type { IWrapper } from '@Engine/Models';

export function AbstractWrapperFactory<T extends IWrapper<ENT>, ENT, PRMS>(type: string, createFn: ICreateFN<T, PRMS>): IAbstractWrapperFactory<T, ENT, PRMS> {
  return {
    ...AbstractFactory(type, createFn)
  };
}
