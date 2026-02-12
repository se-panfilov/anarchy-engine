import type { FactoryType } from '@Anarchy/Engine/Abstract/Constants';
import type { TFactory } from '@Anarchy/Engine/Abstract/Models';
import { nanoid } from 'nanoid';

export function AbstractFactory<T, P>(type: FactoryType | string): Omit<TFactory<T, P>, 'create'> {
  return { id: type + '_factory_' + nanoid(), type };
}
