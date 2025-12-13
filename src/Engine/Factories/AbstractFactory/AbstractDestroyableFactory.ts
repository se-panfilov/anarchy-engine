import { AbstractFactory } from '@Engine/Factories';
import type { ICreateFN } from '@Engine/Factories/AbstractFactory/Models';
import type { IAbstractConfig } from '@Engine/Launcher/Models';
import type { IDestroyableFactory, IWrapper } from '@Engine/Models';

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
    Object.keys(factory).forEach((key: string): void => {
      //eslint-disable-next-line functional/immutable-data
      factory[key as keyof IDestroyableFactory<T, ENT, PRMS, C>] = null;
      // eslint-disable-next-line functional/immutable-data
      delete factory[key as keyof IDestroyableFactory<T, ENT, PRMS, C>];
    });
  }

  return factory;
}
