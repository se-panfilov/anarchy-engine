import { nanoid } from 'nanoid';

import type { FactoryType } from '@/Engine/Domains/Abstract/Constants';
import type { IFactory } from '@/Engine/Domains/Abstract/Models';

export function AbstractFactory<T, P>(type: FactoryType | string): Omit<IFactory<T, P>, 'create'> {
  return { id: type + '_factory_' + nanoid(), type };
}
