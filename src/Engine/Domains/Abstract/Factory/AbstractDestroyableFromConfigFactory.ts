import { cleanObject } from '@Engine/Utils';

import type { IAbstractConfig, IAbstractFactory, IAbstractFromConfigWrapperFactory, ICreateFN, IDestroyableFromConfigFactory, IWrapper } from '../Models';
import { AbstractFromConfigWrapperFactory } from './AbstractFromConfigWrapperFactory';

export function AbstractDestroyableFromConfigFactory<T extends IWrapper<E>, E, P, C extends IAbstractConfig, F extends IAbstractFromConfigWrapperFactory<T, E, P, C, IAbstractFactory<T, P>>>(
  type: string,
  createFn: ICreateFN<T, P>,
  adapterFn?: (config: C) => P
): IDestroyableFromConfigFactory<T, E, P, C, F> {
  const factory: IDestroyableFromConfigFactory<T, E, P, C, F> = {
    ...AbstractFromConfigWrapperFactory(type, createFn, adapterFn),
    destroy
  };

  function destroy(): void {
    cleanObject(factory);
  }

  return factory;
}
