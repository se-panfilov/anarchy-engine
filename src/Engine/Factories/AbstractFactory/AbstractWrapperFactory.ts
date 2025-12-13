import { AbstractFactory } from '@Engine/Factories';
import type { ICreateFN } from '@Engine/Factories/AbstractFactory/Models';
import type { IAbstractWrapperFactory, IWrapper } from '@Engine/Models';

export function AbstractWrapperFactory<T extends IWrapper<ENT>, ENT, PRMS>(type: string, createFn: ICreateFN<T, PRMS>): IAbstractWrapperFactory<T, ENT, PRMS> {
  return {
    ...AbstractFactory(type, createFn)
  };
}
