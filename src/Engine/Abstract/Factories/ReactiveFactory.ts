import type { Subscription } from 'rxjs';
import { Subject } from 'rxjs';

import type { FactoryType } from '@/Engine/Abstract/Constants';
import type {
  TAbstractHooks,
  TCreateEntityFactoryFn,
  TCreateEntityFactoryWithDependenciesAndHooksFn,
  TCreateEntityFactoryWithDependenciesFn,
  TCreateEntityFactoryWithHooksFn,
  TReactiveFactory,
  TReactiveFactoryWithDependencies
} from '@/Engine/Abstract/Models';
import { destroyableMixin } from '@/Engine/Mixins';

import { AbstractFactory } from './AbstractFactory';

export function ReactiveFactory<T, P>(type: FactoryType | string, createEntityFn: TCreateEntityFactoryFn<T, P>): TReactiveFactory<T, P> {
  return ReactiveFactoryWithDependencies<T, P, any>(type, createEntityFn) as TReactiveFactory<T, P>;
}

export function ReactiveFactoryWithHooks<T, P, H extends TAbstractHooks>(type: FactoryType | string, createEntityFn: TCreateEntityFactoryWithHooksFn<T, P, H>): TReactiveFactory<T, P> {
  return ReactiveFactoryWithDependenciesAndHooks<T, P, any, H>(type, createEntityFn) as TReactiveFactory<T, P>;
}

export function ReactiveFactoryWithDependencies<T, P, D>(type: FactoryType | string, createEntityFn: TCreateEntityFactoryWithDependenciesFn<T, P, D>): TReactiveFactoryWithDependencies<T, P, D> {
  return ReactiveFactoryWithDependenciesAndHooks<T, P, D, any>(type, createEntityFn) as TReactiveFactoryWithDependencies<T, P, D>;
}

export function ReactiveFactoryWithDependenciesAndHooks<T, P, D, H extends TAbstractHooks>(
  type: FactoryType | string,
  createEntityFn: TCreateEntityFactoryWithDependenciesAndHooksFn<T, P, D, H>
): TReactiveFactoryWithDependencies<T, P, D> {
  const entityCreated$: Subject<T> = new Subject<T>();

  function create(params: P, dependencies: D, hooks?: H): T {
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
