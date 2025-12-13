import { cleanObject } from '@Engine/Utils';

import type { IAbstractConfig, IAbstractFactory, IAbstractFromConfigWrapperFactory, ICreateFN, IDestroyableFromConfigFactory, IWrapper } from '../Models';
import { AbstractFromConfigWrapperFactory } from './AbstractFromConfigWrapperFactory';

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
