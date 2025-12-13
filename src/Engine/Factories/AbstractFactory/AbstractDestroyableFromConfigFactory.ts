import { AbstractFromConfigWrapperFactory } from '@Engine/Factories';
import type { ICreateFN } from '@Engine/Factories/AbstractFactory/Models';
import type { IAbstractConfig, IAbstractFactory, IAbstractFromConfigWrapperFactory, IDestroyableFromConfigFactory, IWrapper } from '@Engine/Models';
import { cleanObject } from '@Engine/Utils';

export function AbstractDestroyableFromConfigFactory<
  T extends IWrapper<ENT>,
  ENT,
  PRMS,
  C extends IAbstractConfig,
  F extends IAbstractFromConfigWrapperFactory<T, ENT, PRMS, C, IAbstractFactory<T, PRMS>>
>(type: string, createFn: ICreateFN<T, PRMS>, adapterFn?: (config: C) => PRMS): IDestroyableFromConfigFactory<T, ENT, PRMS, C, F> {
  const factory: IDestroyableFromConfigFactory<T, ENT, PRMS, C, F> = {
    ...AbstractFromConfigWrapperFactory(type, createFn, adapterFn),
    destroy
  };

  function destroy(): void {
    cleanObject(factory);
  }

  return factory;
}
