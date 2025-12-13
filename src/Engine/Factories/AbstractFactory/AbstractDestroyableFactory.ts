import { AbstractFactory } from '@Engine/Factories';
import type { ICreateFN } from '@Engine/Factories/AbstractFactory/Models';
import type { IAbstractConfig } from '@Engine/Launcher/Models';
import type { IDestroyableFactory, IWrapper } from '@Engine/Models';

export function AbstractDestroyableFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig>(
  type: string,
  createFn: ICreateFN<T, PRMS>,
  adapterFn?: (config: C) => PRMS
): IDestroyableFactory<T, ENT, PRMS, C> {
  function destroy(): void {
    // TODO (S.Panfilov) implement destroy
  }

  return {
    ...AbstractFactory(type, createFn, adapterFn),
    destroy
  };
}
