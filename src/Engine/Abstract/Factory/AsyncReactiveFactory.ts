import { Subject } from 'rxjs';

import type { FactoryType } from '@/Engine/Abstract/Constants';
import type { IAsyncReactiveFactory } from '@/Engine/Abstract/Models';
import { destroyableMixin } from '@/Engine/Mixins';

import { AbstractFactory } from './AbstractFactory';

export function AsyncReactiveFactory<T, P>(type: FactoryType | string, createEntityFn: (params: P) => Promise<T>): IAsyncReactiveFactory<T, P> {
  const entityCreated$: Subject<T> = new Subject<T>();

  async function create(params: P): Promise<T> {
    const entity: T = await createEntityFn(params);
    entityCreated$.next(entity);
    return entity;
  }

  return {
    ...AbstractFactory(type),
    entityCreated$,
    create,
    ...destroyableMixin()
  };
}
