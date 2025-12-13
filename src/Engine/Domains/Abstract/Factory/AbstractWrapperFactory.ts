import { AbstractFactory } from '@Engine/Domains/Abstract/Factory';
import type { ICreateFN } from '@Engine/Domains/Abstract/Models';
import type { IAbstractWrapperFactory, IWrapper } from '@Engine/Models';

export function AbstractWrapperFactory<T extends IWrapper<ENT>, ENT, PRMS>(type: string, createFn: ICreateFN<T, PRMS>): IAbstractWrapperFactory<T, ENT, PRMS> {
  return {
    ...AbstractFactory(type, createFn)
  };
}
