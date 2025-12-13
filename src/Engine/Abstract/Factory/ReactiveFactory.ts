import { Subject } from 'rxjs';

import type { FactoryType } from '@/Engine/Abstract/Constants';
import type { ICreateEntityFactoryFn, IReactiveFactory } from '@/Engine/Abstract/Models';
import { destroyableMixin } from '@/Engine/Mixins';

import { AbstractFactory } from './AbstractFactory';

export function ReactiveFactory<T, P>(type: FactoryType | string, createEntityFn: ICreateEntityFactoryFn<T, P>): IReactiveFactory<T, P> {
  const entityCreated$: Subject<T> = new Subject<T>();

  function create(params: P, dependencies?: Record<string, any>): T {
    const entity: T = createEntityFn(params, dependencies);
    entityCreated$.next(entity);
    return entity;
  }

  const destroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => entityCreated$.complete());

  return {
    ...AbstractFactory(type),
    entityCreated$: entityCreated$.asObservable(),
    create,
    ...destroyable
  };
}
