import type { ICreateFN } from '@Engine/Factories/AbstractFactory/Models';
import type { IAbstractWrapperFactory, IWrapper } from '@Engine/Models';
import { nanoid } from 'nanoid';

export function AbstractWrapperFactory<T extends IWrapper<ENT>, ENT, PRMS>(type: string, createFn: ICreateFN<T, PRMS>): IAbstractWrapperFactory<T, ENT, PRMS> {
  const id: string = type + '_factory_' + nanoid();

  function create(params: PRMS): T {
    return createFn(params);
  }

  return {
    get id(): string {
      return id;
    },
    get type(): string {
      return type + '_factory';
    },
    create
  };
}
