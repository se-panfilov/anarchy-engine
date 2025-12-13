import type { FactoryType } from '@Engine/Domains/Abstract/Constants';
import type { Observable } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';

import type { IReactiveFactory } from '@/Engine/Domains/Abstract/Models';
import { cleanObject } from '@/Engine/Utils';

import { AbstractFactory } from './AbstractFactory';

export function ReactiveFactory<T, P>(type: FactoryType | string, createEntityFn: (params: P) => T): IReactiveFactory<T, P> {
  const entityCreated$: Subject<T> = new Subject<T>();
  let isInternalChange: boolean = true;
  const destroyed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  destroyed$.subscribe((val: boolean): void => {
    if (!isInternalChange) throw new Error(`Factory ("${type}") doesn't allow to modify "destroyed$" from outside. Attempt to set value: ${String(val)}`);
    isInternalChange = false;
  });

  function destroy(this: IReactiveFactory<T>): void {
    isInternalChange = true;
    destroyed$.next(true);
    destroyed$.unsubscribe();
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
    get destroyed$(): Observable<boolean> {
      return destroyed$.asObservable();
    },
    isDestroyed: (): boolean => destroyed$.getValue(),
    destroy,
    create
  };
}
