import type { FactoryType } from '@Engine/Domains/Abstract/Constants';
import { Subject } from 'rxjs';

import type { IReactiveFactory } from '@/Engine/Domains/Abstract/Models';
import { destroyableMixin } from '@/Engine/Mixins';

import { AbstractFactory } from './AbstractFactory';

export function ReactiveFactory<T, P>(type: FactoryType | string, createEntityFn: (params: P) => T): IReactiveFactory<T, P> {
  const entityCreated$: Subject<T> = new Subject<T>();

  function create(params: P): T {
    const entity: T = createEntityFn(params);
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
