import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Factory } from '../Models/Factory';
import type { Entity } from '@Engine/Models/Entity';

export function AbstractFactory<T extends Entity, R extends Record<string, any>>(
  create: (params: R) => T
): Factory<T, R> {
  let id: string = nanoid();
  let latest$: Subject<T> = new Subject<T>();
  let add$: Subject<R> = new Subject<R>();
  let destroyed$: Subject<void> = new Subject<void>();

  add$.subscribe((val: R): void => latest$.next(create(val)));

  function destroy(): void {
    latest$.complete();
    add$.complete();
    destroyed$.next();
    destroyed$.complete();
  }

  return { id, create, latest$, add$, destroy, destroyed$ };
}
