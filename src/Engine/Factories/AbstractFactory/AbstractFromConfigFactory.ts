import type { IAbstractConfig, IAbstractFactory, IAbstractFromConfigFactory, ICreateFN, IWrapper } from '@/Engine';
import { AbstractFactory, isNotDefined } from '@/Engine';

export function AbstractFromConfigFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig>(
  type: string,
  createFn: ICreateFN<T, PRMS>,
  adapterFn?: (config: C) => PRMS
): IAbstractFromConfigFactory<T, ENT, PRMS, C> {
  const abstractFactory: IAbstractFactory<T, ENT, PRMS> = AbstractFactory(type, createFn);

  function fromConfig(config: C): T {
    if (isNotDefined(adapterFn)) throw new Error(`Factory "${abstractFactory.id}" cannot create from config: adapter function is not provided`);
    return abstractFactory.create(adapterFn(config));
  }

  return {
    ...abstractFactory,
    fromConfig
  };
}
