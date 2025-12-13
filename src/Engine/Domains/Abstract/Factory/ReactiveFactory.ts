import type { FactoryType } from '@Engine/Domains/Abstract/Constants';
import type { Observable } from 'rxjs';
import { Subject } from 'rxjs';

import type { IReactiveFactory } from '@/Engine/Domains/Abstract/Models';
import { cleanObject } from '@/Engine/Utils';

import { AbstractFactory } from './AbstractFactory';

export function ReactiveFactory<T, P>(type: FactoryType | string, createEntityFn: (params: P) => T): IReactiveFactory<T, P> {
  const entityCreated$: Subject<T> = new Subject<T>();
  const destroyed$: Subject<void> = new Subject<void>();
  let isDestroyed: boolean = false;

  const partialFactory = {
    ...AbstractFactory(type),
    entityCreated$,
    destroyed$
  };

  function destroy(this: IReactiveFactory<T>): void {
    isDestroyed = true;
    partialFactory.destroyed$.next();
    partialFactory.destroyed$.complete();
    return cleanObject(this);
  }

  function create(params: P): T {
    const entity: T = createEntityFn(params);
    entityCreated$.next(entity);
    return entity;
  }

  return {
    ...partialFactory,
    get destroyed$(): Observable<void> {
      return destroyed$.asObservable();
    },
    isDestroyed,
    destroy,
    create
  };
}
