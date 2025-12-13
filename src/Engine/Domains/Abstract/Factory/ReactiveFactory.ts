import { Subject } from 'rxjs';

import type { IReactiveFactory } from '@/Engine/Domains/Abstract';
import { AbstractFactory } from '@/Engine/Domains/Abstract';
import { cleanObject } from '@/Engine/Utils';

export function ReactiveFactory<T, P>(type: string, createEntityFn: (params: P) => T): IReactiveFactory<T, P> {
  const entityCreated$: Subject<T> = new Subject<T>();
  const destroyed$: Subject<void> = new Subject<void>();

  const partialFactory = {
    ...AbstractFactory(type),
    entityCreated$,
    destroyed$
  };

  function destroy(this: IReactiveFactory<T>): void {
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
    destroy,
    create
  };
}
