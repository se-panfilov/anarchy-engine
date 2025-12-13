import { AbstractFactory } from '@Engine/Factories';
import type { ICreateFN } from '@Engine/Factories/AbstractFactory/Models';
import type { IAbstractConfig } from '@Engine/Launcher/Models';
import type { IDestroyableFactory, IWrapper } from '@Engine/Models';
import { cleanObject } from '@Engine/Utils';

export function AbstractDestroyableFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig>(
  type: string,
  createFn: ICreateFN<T, PRMS>,
  adapterFn?: (config: C) => PRMS
): IDestroyableFactory<T, ENT, PRMS, C> {
  const factory: IDestroyableFactory<T, ENT, PRMS, C> = {
    ...AbstractFactory(type, createFn, adapterFn),
    destroy
  };

  function destroy(): void {
    cleanObject(factory);
  }

  return factory;
}
