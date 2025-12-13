import { nanoid } from 'nanoid';

import type { FactoryType } from '@/Abstract/Constants';
import type { TFactory } from '@/Abstract/Models';

export function AbstractFactory<T, P>(type: FactoryType | string): Omit<TFactory<T, P>, 'create'> {
  return { id: type + '_factory_' + nanoid(), type };
}
