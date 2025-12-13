import type { Subscription } from 'rxjs';
import { Subject } from 'rxjs';

import type { FactoryType } from '@/Engine/Abstract/Constants';
import type { TCreateEntityFactoryFn, TReactiveFactory } from '@/Engine/Abstract/Models';
import { destroyableMixin } from '@/Engine/Mixins';

import { AbstractFactory } from './AbstractFactory';

export function ReactiveFactory<T, P, D = Record<string, any> | undefined>(type: FactoryType | string, createEntityFn: TCreateEntityFactoryFn<T, P, D>): TReactiveFactory<T, P, D> {
  const entityCreated$: Subject<T> = new Subject<T>();

  function create(params: P, dependencies: D): T {
    const entity: T = createEntityFn(params, dependencies);
    entityCreated$.next(entity);
    return entity;
  }

  const destroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    entityCreated$.complete();
    entityCreated$.unsubscribe();
  });

  return Object.assign(AbstractFactory(type), {
    entityCreated$: entityCreated$.asObservable(),
    create,
    ...destroyable
  });
}
