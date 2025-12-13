import { nanoid } from 'nanoid';

import type { IFactory } from '@Engine/Domains/Abstract/Models';
import type { FactoryType } from '@Engine/Domains/Abstract/Constants';

export function AbstractFactory<T, P>(type: FactoryType | string): Omit<IFactory<T, P>, 'create'> {
  const id: string = type + '_factory_' + nanoid();

  return {
    get id(): string {
      return id;
    },
    get type(): string {
      return type;
    }
  };
}
