import type { FactoryType } from '@Engine/Domains/Abstract/Constants';
import { BehaviorSubject, Subject } from 'rxjs';

import type { IReactiveFactory } from '@/Engine/Domains/Abstract/Models';
import { withDestroyedMixin } from '@/Engine/Domains/Mixins';
import { cleanObject } from '@/Engine/Utils';

import { AbstractFactory } from './AbstractFactory';

export function ReactiveFactory<T, P>(type: FactoryType | string, createEntityFn: (params: P) => T): IReactiveFactory<T, P> {
  const entityCreated$: Subject<T> = new Subject<T>();
  const destroyed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  function destroy(this: IReactiveFactory<T>): void {
    destroyed$.next(true);
    destroyed$.complete();
    return cleanObject(this);
  }

  function create(params: P): T {
    const entity: T = createEntityFn(params);
    entityCreated$.next(entity);
    return entity;
  }

  return {
    ...AbstractFactory(type),
    entityCreated$,
    create,
    destroy,
    ...withDestroyedMixin(destroyed$)
  };
}
