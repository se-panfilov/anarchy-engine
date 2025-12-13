// import { AbstractWrapperFactory } from '@Engine/Domains/Abstract/Factory';
// import { cleanObject } from '@Engine/Utils';
//
// import type { IAbstractFactory,ICreateFN, IDestroyableFactory, IWrapper } from '../Models';
//
// export function AbstractDestroyableFactory<T extends IWrapper<ENT>, ENT, PRMS, F extends IAbstractFactory<T, PRMS>>(type: string, createFn: ICreateFN<T, PRMS>): IDestroyableFactory<T, ENT, PRMS, F> {
//   const factory: IDestroyableFactory<T, ENT, PRMS, F> = {
//     ...AbstractWrapperFactory(type, createFn),
//     destroy
//   };
//
//   function destroy(): void {
//     cleanObject(factory);
//   }
//
//   return factory;
// }
