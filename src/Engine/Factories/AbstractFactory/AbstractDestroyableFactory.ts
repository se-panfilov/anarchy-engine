import { AbstractWrapperFactory } from '@Engine/Factories';
import type { ICreateFN } from '@Engine/Factories/AbstractFactory/Models';
import type { IDestroyableFactory, IWrapper } from '@Engine/Models';
import { cleanObject } from '@Engine/Utils';

export function AbstractDestroyableFactory<T extends IWrapper<ENT>, ENT, PRMS>(type: string, createFn: ICreateFN<T, PRMS>): IDestroyableFactory<T, ENT, PRMS> {
  const factory: IDestroyableFactory<T, ENT, PRMS> = {
    ...AbstractWrapperFactory(type, createFn),
    destroy
  };

  function destroy(): void {
    cleanObject(factory);
  }

  return factory;
}
