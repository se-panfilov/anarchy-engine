import type { FactoryType } from '@Engine/Abstract/Constants';
import type { TCreateEntityFactoryFn, TReactiveFactory } from '@Engine/Abstract/Models';
import type { TDestroyable } from '@Engine/Mixins';
import { destroyableMixin } from '@Engine/Mixins';
import type { Subscription } from 'rxjs';
import { Subject } from 'rxjs';

import { AbstractFactory } from './AbstractFactory';

export function ReactiveFactory<T, P, D = Record<string, any> | undefined, O extends Record<string, any> | undefined = undefined>(
  type: FactoryType | string,
  createEntityFn: TCreateEntityFactoryFn<T, P, D, O>
): TReactiveFactory<T, P, D> {
  const entityCreated$: Subject<T> = new Subject<T>();

  function create(params: P, dependencies: D, options?: O): T {
    const entity: T = createEntityFn(params, dependencies, options);
    entityCreated$.next(entity);
    return entity;
  }

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    entityCreated$.complete();
  });

  return Object.assign(AbstractFactory(type), {
    entityCreated$: entityCreated$.asObservable(),
    create,
    ...destroyable
  });
}
