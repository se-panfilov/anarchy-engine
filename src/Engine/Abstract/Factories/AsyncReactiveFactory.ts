import { Subject } from 'rxjs';

import type { FactoryType } from '@/Engine/Abstract/Constants';
import type { TAsyncReactiveFactory, TCreateAsyncEntityFactoryFn, TCreateAsyncEntityFactoryWithDependenciesFn } from '@/Engine/Abstract/Models';
import { destroyableMixin } from '@/Engine/Mixins';

import { AbstractFactory } from './AbstractFactory';

export function AsyncReactiveFactory<T, P, D>(
  type: FactoryType | string,
  createEntityFn: TCreateAsyncEntityFactoryFn<T, P> | TCreateAsyncEntityFactoryWithDependenciesFn<T, P, D>
): TAsyncReactiveFactory<T, P, D> {
  const entityCreated$: Subject<T> = new Subject<T>();

  async function createAsync(params: P, dependencies: D): Promise<T> {
    const entity: T = await createEntityFn(params, dependencies);
    entityCreated$.next(entity);
    return entity;
  }

  return Object.assign(AbstractFactory(type), {
    entityCreated$,
    createAsync,
    ...destroyableMixin()
  });
}
