import { Subject } from 'rxjs';

import type { FactoryType } from '@/Engine/Abstract/Constants';
import type { TAsyncReactiveFactory, TCreateAsyncEntityFactoryFn } from '@/Engine/Abstract/Models';
import { destroyableMixin } from '@/Engine/Mixins';

import { AbstractFactory } from './AbstractFactory';

export function AsyncReactiveFactory<T, P>(type: FactoryType | string, createEntityFn: TCreateAsyncEntityFactoryFn<T, P>): TAsyncReactiveFactory<T, P> {
  const entityCreated$: Subject<T> = new Subject<T>();

  async function createAsync(params: P, dependencies?: Record<string, any>): Promise<T> {
    const entity: T = await createEntityFn(params, dependencies);
    entityCreated$.next(entity);
    return entity;
  }

  return {
    ...AbstractFactory(type),
    entityCreated$,
    createAsync,
    ...destroyableMixin()
  };
}
