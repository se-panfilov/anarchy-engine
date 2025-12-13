import type { ICreateFN } from '@Engine/Factories';
import { AbstractWrapperFactory } from '@Engine/Factories';
import type { IAbstractConfig, IAbstractFactory, IAbstractFromConfigWrapperFactory, IAbstractWrapperFactory, IWrapper } from '@Engine/Models';
import { isNotDefined } from '@Engine/Utils';

export function AbstractFromConfigWrapperFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig>(
  type: string,
  createFn: ICreateFN<T, PRMS>,
  adapterFn?: (config: C) => PRMS
): IAbstractFromConfigWrapperFactory<T, ENT, PRMS, C, IAbstractFactory<T, PRMS>> {
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
