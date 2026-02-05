import type { FactoryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import type { TFactory } from '@hellpig/anarchy-engine/Abstract/Models';
import { nanoid } from 'nanoid';

export function AbstractFactory<T, P>(type: FactoryType | string): Omit<TFactory<T, P>, 'create'> {
  return { id: type + '_factory_' + nanoid(), type };
}
