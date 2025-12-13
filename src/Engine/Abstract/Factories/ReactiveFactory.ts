import type { Subscription } from 'rxjs';
import { Subject } from 'rxjs';

import type { FactoryType } from '@/Engine/Abstract/Constants';
import type { TAbstractHooks, TCreateEntityFactoryFn, TReactiveFactory } from '@/Engine/Abstract/Models';
import { destroyableMixin } from '@/Engine/Mixins';

import { AbstractFactory } from './AbstractFactory';

export function ReactiveFactory<T, P, D = Record<string, any> | undefined, H extends TAbstractHooks = undefined>(
  type: FactoryType | string,
  createEntityFn: TCreateEntityFactoryFn<T, P, D, H>
): TReactiveFactory<T, P, D, H> {
  const entityCreated$: Subject<T> = new Subject<T>();

  function create(params: P, dependencies: D, hooks: H): T {
    const entity: T = createEntityFn(params, dependencies, hooks);
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
