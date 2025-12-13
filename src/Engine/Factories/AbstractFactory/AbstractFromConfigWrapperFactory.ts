import type { IAbstractConfig, IAbstractFromConfigWrapperFactory, IAbstractWrapperFactory, ICreateFN, IWrapper } from '@/Engine';
import { AbstractWrapperFactory, isNotDefined } from '@/Engine';

export function AbstractFromConfigWrapperFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig>(
  type: string,
  createFn: ICreateFN<T, PRMS>,
  adapterFn?: (config: C) => PRMS
): IAbstractFromConfigWrapperFactory<T, ENT, PRMS, C> {
  const abstractFactory: IAbstractWrapperFactory<T, ENT, PRMS> = AbstractWrapperFactory(type, createFn);

  function fromConfig(config: C): T {
    if (isNotDefined(adapterFn)) throw new Error(`Factory "${abstractFactory.id}" cannot create from config: adapter function is not provided`);
    return abstractFactory.create(adapterFn(config));
  }

  return {
    ...abstractFactory,
    fromConfig
  };
}
