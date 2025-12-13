import type { IAbstractFromConfigWrapperFactory } from '@Engine/Domains/Mixins';
import { isNotDefined } from '@Engine/Utils';

import type { IAbstractConfig, IAbstractFactory, IAbstractWrapperFactory, ICreateFN, IWrapper } from '../Models';
import { AbstractWrapperFactory } from './AbstractWrapperFactory';

export function AbstractFromConfigWrapperFactory<T extends IWrapper<E>, E, P, C extends IAbstractConfig>(
  type: string,
  createFn: ICreateFN<T, P>,
  adapterFn?: (config: C) => P
): IAbstractFromConfigWrapperFactory<T, E, P, C, IAbstractFactory<T, P>> {
  const abstractFactory: IAbstractWrapperFactory<T, E, P> = AbstractWrapperFactory(type, createFn);

  function fromConfig(config: C): T {
    if (isNotDefined(adapterFn)) throw new Error(`Factory "${abstractFactory.id}" cannot create from config: adapter function is not provided`);
    return abstractFactory.create(adapterFn(config));
  }

  return {
    ...abstractFactory,
    fromConfig
  };
}
