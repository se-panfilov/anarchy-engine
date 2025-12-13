import type { ICreateFN } from '@Engine/Factories/AbstractFactory/Models';
import type { IAbstractConfig, IFactory, IWrapper } from '@Engine/Models';
import { isNotDefined } from '@Engine/Utils';
import { nanoid } from 'nanoid';

// TODO (S.Panfilov) create form config is an extra functionality,
//  could be extracted from here ("FactoryFromConfig", which together with "AbstractFactory" makes just "Factory")
export function AbstractFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig>(type: string, createFn: ICreateFN<T, PRMS>, adapterFn?: (config: C) => PRMS): IFactory<T, ENT, PRMS, C> {
  const id: string = type + '_factory_' + nanoid();

  function create(params: PRMS): T {
    return createFn(params);
  }

  function fromConfig(config: C): T {
    if (isNotDefined(adapterFn)) throw new Error(`Factory "${id}" cannot create from config: adapter function is not provided`);
    return create(adapterFn(config));
  }

  return {
    get id(): string {
      return id;
    },
    get type(): string {
      return type + '_factory';
    },
    create,
    fromConfig
  };
}
