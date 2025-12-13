import { Subject } from 'rxjs';

import type { FactoryType } from '@/Engine/Abstract/Constants';
import type { IReactiveFactory } from '@/Engine/Abstract/Models';
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
