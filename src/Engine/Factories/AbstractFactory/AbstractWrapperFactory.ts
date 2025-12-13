import type { ICreateFN } from '@Engine/Factories/AbstractFactory/Models';
import type { IAbstractWrapperFactory, IWrapper } from '@Engine/Models';
import { AbstractFactory } from '@/Engine';

export function AbstractWrapperFactory<T extends IWrapper<ENT>, ENT, PRMS>(type: string, createFn: ICreateFN<T, PRMS>): IAbstractWrapperFactory<T, ENT, PRMS> {
  return {
    ...AbstractFactory(type, createFn)
  };
}
