import { AbstractFromConfigWrapperFactory } from '@Engine/Factories';
import type { ICreateFN } from '@Engine/Factories/AbstractFactory/Models';
import type { IAbstractConfig, IDestroyableFromConfigFactory, IWrapper } from '@Engine/Models';
import { cleanObject } from '@Engine/Utils';

export function AbstractDestroyableFromConfigFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig>(
  type: string,
  createFn: ICreateFN<T, PRMS>,
  adapterFn?: (config: C) => PRMS
): IDestroyableFromConfigFactory<T, ENT, PRMS, C> {
  const factory: IDestroyableFromConfigFactory<T, ENT, PRMS, C> = {
    ...AbstractFromConfigWrapperFactory(type, createFn, adapterFn),
    destroy
  };

  function destroy(): void {
    cleanObject(factory);
  }

  return factory;
}
